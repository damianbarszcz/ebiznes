package route

import (
	"github.com/labstack/echo/v4"
	"myapp/config"
	"myapp/controllers"
	appMiddleware "myapp/middleware"
	"net/http"
)

func Init(g *echo.Group, config *config.Config) {
	g.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "App Backend")
	})

	g.GET("/products", controllers.GetProducts)
	g.GET("/products/:id", controllers.GetProduct)
	g.GET("/carts/:cart_id", controllers.GetCart)
	g.POST("/cart/add-to-cart", controllers.AddToCart)
	g.POST("/cart/make-payment", controllers.MakePayment)

	g.POST("/login", controllers.LoginHandler)
	g.POST("/register", controllers.RegisterHandler)

	g.GET("/auth/google/login", func(c echo.Context) error {
		return controllers.HandleGoogleLogin(c, config)
	})
	g.GET("/auth/google/callback", func(c echo.Context) error {
		return controllers.HandleGoogleCallback(c, config)
	})

	protected := g.Group("/user")
	protected.Use(appMiddleware.JWTMiddleware())

}
