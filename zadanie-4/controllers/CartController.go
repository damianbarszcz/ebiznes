package controllers

import (
	"errors"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
	"myapp/database"
	"myapp/models"
	"net/http"
	"strconv"
)

func GetAllCarts(c echo.Context) error {
	var carts []models.Cart
	if err := database.Db.Find(&carts).Error; err != nil {
		return err
	}
	if len(carts) == 0 {
		return c.JSON(http.StatusOK, map[string]string{"message": "No carts created."})
	}
	return c.JSON(http.StatusOK, carts)
}

func GetCart(c echo.Context) error {
	cartID, err := strconv.Atoi(c.Param("cart_id"))
	if err != nil {
		return c.String(http.StatusBadRequest, "Invalid cart ID.")
	}

	var cartProducts []models.Cart
	if err := database.Db.Where("cart_id = ?", cartID).Find(&cartProducts).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.String(http.StatusNotFound, "No cart with the specified ID was found.")
		}
		return err
	}

	return c.JSON(http.StatusOK, cartProducts)
}

func AddToCart(c echo.Context) error {
	cart := new(models.Cart)
	if err := c.Bind(cart); err != nil {
		return err
	}
	if err := database.Db.Create(&cart).Error; err != nil {
		return c.String(http.StatusInternalServerError, "Nie można dodać koszyka")
	}
	return c.JSON(http.StatusCreated, cart)
}
