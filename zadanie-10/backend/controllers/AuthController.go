package controllers

import (
	"github.com/golang-jwt/jwt"
	"github.com/labstack/echo/v4"
	"golang.org/x/crypto/bcrypt"
	"log"
	"myapp/database"
	"myapp/models"
	"net/http"
	"os"
	"time"
)

func LoginHandler(c echo.Context) error {

	var creds struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	if err := c.Bind(&creds); err != nil {
		log.Println("Bind error:", err)
		return c.JSON(http.StatusBadRequest, map[string]string{"message": "invalid request"})
	}

	var user models.User
	if err := database.Db.Where("username = ?", creds.Username).First(&user).Error; err != nil {
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

	return c.JSON(http.StatusOK, map[string]interface{}{
		"token":    tokenString,
		"username": user.Username,
	})
}

func RegisterHandler(c echo.Context) error {
	var creds struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	if err := c.Bind(&creds); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"message": "invalid request"})
	}

	var existingUser models.User
	if err := database.Db.Where("username = ?", creds.Username).First(&existingUser).Error; err == nil {
		return c.JSON(http.StatusConflict, map[string]string{"message": "username already exists"})
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(creds.Password), bcrypt.DefaultCost)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "could not create user"})
	}

	user := models.User{
		Username:  creds.Username,
		Password:  string(hashedPassword),
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}
	if err := database.Db.Create(&user).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "could not create user"})
	}

	return c.JSON(http.StatusOK, map[string]string{"message": "user registered successfully"})
}
