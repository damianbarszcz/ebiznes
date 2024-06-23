package models

import (
	"gorm.io/gorm"
	"time"
)

type Payment struct {
	gorm.Model
	ID          uint
	PaymentID   uint
	CartID      uint
	TotalAmount uint
	CreatedAt   time.Time
	UpdatedAt   time.Time
	DeletedAt   *time.Time
}
