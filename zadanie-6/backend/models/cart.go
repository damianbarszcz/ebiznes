package models

import (
	"gorm.io/gorm"
	"time"
)

type Cart struct {
	gorm.Model
	ID           uint
	CartID       uint
	ProductID    uint
	ProductCount uint
	CreatedAt    time.Time
	UpdatedAt    time.Time
	DeletedAt    *time.Time
}
