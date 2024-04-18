package controllers

import (
	"errors"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
	"log"
	"myapp/database"
	"myapp/models"
	"net/http"
	"strconv"
)

//Display all carts
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

//Display products in the cart
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

//Add product to the cart
func AddToCart(c echo.Context) error {
	cart := new(models.Cart)
	if err := c.Bind(cart); err != nil {
		return err
	}
	if err := database.Db.Create(&cart).Error; err != nil {
		return c.String(http.StatusInternalServerError, "Cannot add to cart.")
	}
	return c.JSON(http.StatusCreated, cart)
}

//Change product in the cart
func UpdateCart(c echo.Context) error {
	cartID, err := strconv.Atoi(c.Param("cart_id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid cart ID.")
	}
	productID, err := strconv.Atoi(c.Param("product_id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid product ID.")
	}

	var updatedCart models.Cart
	if err := c.Bind(&updatedCart); err != nil {
		return err
	}
	if err := database.Db.Model(&models.Cart{}).
		Where("cart_id = ? AND product_id = ?", cartID, productID).
		Updates(&updatedCart).Error; err != nil {
		return err
	}
	return c.JSON(http.StatusOK, "Product was updated.")
}

//Delete product from the cart
func DeleteFromCart(c echo.Context) error {
	cartID, err := strconv.Atoi(c.Param("cart_id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid cart ID.")
	}
	productID, err := strconv.Atoi(c.Param("product_id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid product ID.")
	}

	if err := database.Db.Where("cart_id = ? AND product_id = ?", cartID, productID).Delete(&models.Cart{}).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.NoContent(http.StatusNotFound)
		}
		log.Println("Error deleting product from cart:", err)
		return c.JSON(http.StatusInternalServerError, "Failed to delete product from cart.")
	}

	return c.JSON(http.StatusOK, "Product was deleted.")
}
