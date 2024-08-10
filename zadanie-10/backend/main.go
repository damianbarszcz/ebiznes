package main

import (
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"log"
	"myapp/database"
	"myapp/route"
)

func main() {
	log.Println("Starting the backend application...")
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	database.Connection()

	app := echo.New()

	app.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins:     []string{"https://db-frontend-app.azurewebsites.net", "http://localhost:5173"},
		AllowMethods:     []string{echo.GET, echo.PUT, echo.POST, echo.DELETE},
		AllowCredentials: true,
	}))
	api := app.Group("/api")
	route.Init(api)

	defer database.CloseDB()
	app.Logger.Fatal(app.Start(":8000"))
}
