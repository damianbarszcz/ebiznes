package main

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"myapp/database"
	"myapp/route"
)

func main() {
	database.Connection()

	app := echo.New()

	app.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{echo.GET, echo.PUT, echo.POST, echo.DELETE},
		AllowCredentials: true,
	}))

	route.Init(app.Group("/api"))

	defer database.CloseDB()

	app.Logger.Fatal(app.Start(":3000"))
}
