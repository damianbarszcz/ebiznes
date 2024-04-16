package models

import "gorm.io/gorm"

type Cart struct {
	gorm.Model
	ID        uint
	CartID    uint
	ProductID uint
}
