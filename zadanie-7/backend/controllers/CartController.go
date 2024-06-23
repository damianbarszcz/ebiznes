package controllers

import (
	"errors"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
	_ "log"
	"math/rand"
	"myapp/database"
	"myapp/models"
	"net/http"
	"strconv"
)

//Display products in the cart
func GetCart(c echo.Context) error {
	cartID, err := strconv.Atoi(c.Param("cart_id"))
	if err != nil {
		return c.String(http.StatusBadRequest, "Invalid cart ID.")
	}

	var cartProductDetails []map[string]interface{}
	if err := database.Db.Table("carts").
		Select("products.id as product_id, products.name as product_name, products.price as product_price, carts.product_count").
		Joins("join products on products.id = carts.product_id AND carts.deleted_at IS NULL").
		Where("carts.cart_id = ?", cartID).
		Scan(&cartProductDetails).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.String(http.StatusNotFound, "No cart with the specified ID was found.")
		}
		return err
	}

	return c.JSON(http.StatusOK, cartProductDetails)
}

//Add product to the cart
func AddToCart(c echo.Context) error {
	type AddToCartRequest struct {
		ProductID    uint `json:"product_id"`
		ProductCount uint `json:"product_count"`
		CardID       uint `json:"cart_id"`
	}

	var request AddToCartRequest
	if err := c.Bind(&request); err != nil {
		return c.String(http.StatusBadRequest, "Invalid request.")
	}

	var cart models.Cart
	result := database.Db.Where("cart_id = ? AND product_id = ?", request.CardID, request.ProductID).First(&cart)
	//New change
	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		cart = models.Cart{
			CartID:       request.CardID,
			ProductID:    request.ProductID,
			ProductCount: request.ProductCount,
		}
		database.Db.Save(&cart)

		return c.JSON(http.StatusOK, cart)
	}
	cart.ProductCount += request.ProductCount
	database.Db.Save(&cart)

	return c.JSON(http.StatusOK, cart)
}

//Make payment for products in cart
func MakePayment(c echo.Context) error {
	type AddToCartRequest struct {
		CartID      uint `json:"cart_id"`
		TotalAmount uint `json:"total_amount"`
	}
	var request AddToCartRequest
	if err := c.Bind(&request); err != nil {
		return c.String(http.StatusBadRequest, "Invalid request.")
	}
	var cart models.Cart
	var payment models.Payment

	database.Db.Where("cart_id = ?", 1).Delete(&models.Cart{})

	min := int64(0)
	max := int64(1e12)
	randomNumber := min + rand.Int63n(max-min+1)

	payment = models.Payment{
		CartID:      request.CartID,
		PaymentID:   uint(randomNumber),
		TotalAmount: request.TotalAmount,
	}
	database.Db.Save(&payment)

	return c.JSON(http.StatusOK, cart)
}
