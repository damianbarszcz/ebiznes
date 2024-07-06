package database

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"log"
	"myapp/models"
)

var Db *gorm.DB

func Connection() {
	var err error
	Db, err = gorm.Open(sqlite.Open("myapp.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	if err := Db.AutoMigrate(&models.Product{}); err != nil {
		log.Fatalf("Failed to migrate Product: %v", err)
	}
	if err := Db.AutoMigrate(&models.Cart{}); err != nil {
		log.Fatalf("Failed to migrate Cart: %v", err)
	}
	if err := Db.AutoMigrate(&models.Payment{}); err != nil {
		log.Fatalf("Failed to migrate Payment: %v", err)
	}
}

func CloseDB() {
	dbSQL, err := Db.DB()
	if err != nil {
		panic(err)
	}
	dbSQL.Close()
}
