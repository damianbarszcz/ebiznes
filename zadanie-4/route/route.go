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
	g.GET("/products/:id", controllers.GetProduct)
	g.POST("/products", controllers.CreateProduct)
	g.PUT("/products/:id", controllers.UpdateProduct)
	g.DELETE("/products/:id", controllers.DeleteProduct)

	g.GET("/carts", controllers.GetAllCarts)
	g.GET("/carts/:cart_id", controllers.GetCart)
	g.POST("/cart/add-to-cart", controllers.AddToCart)
	g.PUT("/cart/:cart_id/:product_id", controllers.UpdateCart)
	g.DELETE("/cart/:cart_id/:product_id", controllers.DeleteFromCart)
}
