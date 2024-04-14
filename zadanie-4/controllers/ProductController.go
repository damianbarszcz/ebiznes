package controllers

import (
	"github.com/labstack/echo/v4"
	"myapp/data"
	"net/http"
)

func GetProducts(c echo.Context) error {
	return c.JSON(http.StatusOK, data.Products)
}
