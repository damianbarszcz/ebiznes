package controllers

import (
	"github.com/labstack/echo/v4"
	"myapp/database"
	"myapp/models"
	"net/http"
)

func GetProducts(c echo.Context) error {
	var products []models.Product
	if err := database.Db.Find(&products).Error; err != nil {
		return err
	}
	return c.JSON(http.StatusOK, products)
}
