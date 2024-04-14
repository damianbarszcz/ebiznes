package route

import (
	"github.com/labstack/echo/v4"
	"myapp/controllers"
	"net/http"
)

func Init(g *echo.Group) {
	g.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello Zadanie 4")
	})

	g.GET("/products", controllers.GetProducts)
}
