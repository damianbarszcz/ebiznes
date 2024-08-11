package controllers

import (
	"context"
	"encoding/json"
	"github.com/golang-jwt/jwt"
	"github.com/labstack/echo/v4"
	"golang.org/x/crypto/bcrypt"
	"io/ioutil"
	"log"
	"myapp/config"
	"myapp/database"
	"myapp/models"
	"net/http"
	"net/url"
	"os"
	"strings"
	"time"
)

func LoginHandler(c echo.Context) error {
	var creds struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := c.Bind(&creds); err != nil {
		log.Println("Bind error:", err)
		return c.JSON(http.StatusBadRequest, map[string]string{"message": "invalid request"})
	}

	var user models.User
	if err := database.Db.Where("email = ?", creds.Email).First(&user).Error; err != nil {
		log.Println("User not found:", err)
		return c.JSON(http.StatusUnauthorized, map[string]string{"message": "invalid credentials"})
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(creds.Password)); err != nil {
		log.Println("Password mismatch:", err)
		return c.JSON(http.StatusUnauthorized, map[string]string{"message": "invalid credentials"})
	}

	jwtSecret := os.Getenv("JWT_SECRET")
	if jwtSecret == "" {
		log.Println("JWT_SECRET is not set")
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "internal server error"})
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.ID,
		"exp":     time.Now().Add(time.Hour * 72).Unix(),
	})

	tokenString, err := token.SignedString([]byte(jwtSecret))
	if err != nil {
		log.Println("Error signing token:", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "could not generate token"})
	}
	userData := map[string]string{
		"token":     tokenString,
		"email":     user.Email,
		"firstName": user.Name,
		"lastName":  user.Surename,
	}
	userDataJSON, err := json.Marshal(userData)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "could not serialize user data")
	}
	encodedUserData := url.QueryEscape(string(userDataJSON))

	c.SetCookie(&http.Cookie{
		Name:     "user_data",
		Value:    encodedUserData,
		Expires:  time.Now().Add(72 * time.Hour),
		HttpOnly: false,
		Secure:   false,
		Path:     "/",
	})

	return c.JSON(http.StatusOK, map[string]interface{}{
		"token":     tokenString,
		"email":     user.Email,
		"firstName": user.Name,
		"lastName":  user.Surename,
	})
}

func RegisterHandler(c echo.Context) error {
	var creds struct {
		Email    string `json:"email"`
		Name     string `json:"name"`
		Surename string `json:"surename"`
		Password string `json:"password"`
	}

	if err := c.Bind(&creds); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"message": "invalid request"})
	}

	var existingUser models.User
	if err := database.Db.Where("email = ?", creds.Email).First(&existingUser).Error; err == nil {
		return c.JSON(http.StatusConflict, map[string]string{"message": "email already exists"})
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(creds.Password), bcrypt.DefaultCost)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "could not create user"})
	}

	user := models.User{
		Email:     creds.Email,
		Name:      creds.Name,
		Surename:  creds.Surename,
		Password:  string(hashedPassword),
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}
	if err := database.Db.Create(&user).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "could not create user"})
	}

	return c.JSON(http.StatusOK, map[string]string{"message": "user registered successfully"})
}

func HandleGoogleLogin(c echo.Context, cfg *config.Config) error {
	url := cfg.OauthConf.AuthCodeURL(cfg.OauthStateString)
	return c.Redirect(http.StatusTemporaryRedirect, url)
}

func HandleGoogleCallback(c echo.Context, cfg *config.Config) error {
	state := c.FormValue("state")
	if state != cfg.OauthStateString {
		return c.JSON(http.StatusUnauthorized, "invalid oauth state")
	}

	code := c.FormValue("code")
	if code == "" {
		return c.JSON(http.StatusBadRequest, "code not found")
	}

	token, err := cfg.OauthConf.Exchange(context.Background(), code)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "could not get token")
	}

	client := cfg.OauthConf.Client(context.Background(), token)
	resp, err := client.Get("https://www.googleapis.com/oauth2/v2/userinfo")
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "could not get user info")
	}
	defer resp.Body.Close()

	userInfo, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "could not read user info")
	}

	var user map[string]interface{}
	if err := json.Unmarshal(userInfo, &user); err != nil {
		return c.JSON(http.StatusInternalServerError, "could not unmarshal user info")
	}

	userEmail, ok := user["email"].(string)
	if !ok {
		return c.JSON(http.StatusInternalServerError, "invalid email")
	}

	userID, ok := user["id"].(string)
	if !ok {
		return c.JSON(http.StatusInternalServerError, "invalid user id")
	}

	fullName, ok := user["name"].(string)
	if !ok {
		return c.JSON(http.StatusInternalServerError, "invalid name")
	}

	nameParts := strings.SplitN(fullName, " ", 2)
	var firstName, lastName string
	if len(nameParts) > 0 {
		firstName = nameParts[0]
	}
	if len(nameParts) > 1 {
		lastName = nameParts[1]
	}

	var existingUser models.User
	if err := database.Db.Where("provider_id = ?", userID).First(&existingUser).Error; err != nil {
		newUser := models.User{
			ProviderID: userID,
			Email:      userEmail,
			Name:       firstName,
			Surename:   lastName,
			CreatedAt:  time.Now(),
			UpdatedAt:  time.Now(),
		}
		if err := database.Db.Create(&newUser).Error; err != nil {
			return c.JSON(http.StatusInternalServerError, "could not create user")
		}
		existingUser = newUser
	}

	jwtToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": existingUser.ID,
		"exp":     time.Now().Add(time.Hour * 72).Unix(),
	})

	tokenString, err := jwtToken.SignedString(cfg.JwtKey)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "could not generate token")
	}

	userData := map[string]string{
		"token":     tokenString,
		"email":     existingUser.Email,
		"firstName": existingUser.Name,
		"lastName":  existingUser.Surename,
	}

	userDataJSON, err := json.Marshal(userData)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "could not serialize user data")
	}

	encodedUserData := url.QueryEscape(string(userDataJSON))

	c.SetCookie(&http.Cookie{
		Name:     "user_data",
		Value:    encodedUserData,
		Expires:  time.Now().Add(72 * time.Hour),
		HttpOnly: false,
		Secure:   false,
		Path:     "/",
		Domain:   "localhost",
	})

	redirectURL := "http://localhost:5173/user/dashboard"
	return c.Redirect(http.StatusTemporaryRedirect, redirectURL)
}
