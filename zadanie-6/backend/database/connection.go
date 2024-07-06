package database

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"myapp/models"
)

var Db *gorm.DB

func Connection() {
	var err error
	Db, err = gorm.Open(sqlite.Open("myapp.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	Db.AutoMigrate(&models.Product{})
	Db.AutoMigrate(&models.Cart{})
	Db.AutoMigrate(&models.Payment{})
}

func CloseDB() {
	dbSQL, err := Db.DB()
	if err != nil {
		panic(err)
	}
	dbSQL.Close()
}
