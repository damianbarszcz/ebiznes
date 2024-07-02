package route

import (
	"github.com/labstack/echo/v4"
	"myapp/controllers"
	appMiddleware "myapp/middleware"
	"net/http"
)

func Init(g *echo.Group) {
	g.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "App Backend")
	})

	g.GET("/products", controllers.GetProducts)
	g.GET("/carts/:cart_id", controllers.GetCart)
	g.POST("/cart/add-to-cart", controllers.AddToCart)
	g.POST("/cart/make-payment", controllers.MakePayment)
	g.POST("/login", controllers.LoginHandler)
	g.POST("/register", controllers.RegisterHandler)

	protected := g.Group("/user")
	protected.Use(appMiddleware.JWTMiddleware())
}
