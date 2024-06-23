package models

import (
	"gorm.io/gorm"
	"time"
)

type Product struct {
	gorm.Model

	ID        uint
	Name      string
	Price     int
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt *time.Time
}
