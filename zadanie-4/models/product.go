package models

import "gorm.io/gorm"

type Product struct {
	gorm.Model

	ID    uint
	Name  string
	Price int
}
