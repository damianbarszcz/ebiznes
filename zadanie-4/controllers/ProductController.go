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

func GetProducts(c echo.Context) error {
	var products []models.Product
	if err := database.Db.Find(&products).Error; err != nil {
		return err
	}
	return c.JSON(http.StatusOK, products)
}

func GetProduct(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	var product models.Product
	if err := database.Db.First(&product, id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.NoContent(http.StatusNotFound)
		}
		return err
	}
	return c.JSON(http.StatusOK, product)
}

func CreateProduct(c echo.Context) error {
	var product models.Product
	if err := c.Bind(&product); err != nil {
		return err
	}
	if err := database.Db.Create(&product).Error; err != nil {
		return err
	}
	return c.JSON(http.StatusOK, "Product was created.")
}

func UpdateProduct(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	var updatedProduct models.Product
	if err := c.Bind(&updatedProduct); err != nil {
		return err
	}
	if err := database.Db.Model(&models.Product{}).Where("id = ?", id).Updates(&updatedProduct).Error; err != nil {
		return err
	}
	return c.JSON(http.StatusOK, updatedProduct)
}

func DeleteProduct(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	if err := database.Db.Delete(&models.Product{}, id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.NoContent(http.StatusNotFound)
		}
		return err
	}
	return c.JSON(http.StatusOK, "Product was deleted.")
}
