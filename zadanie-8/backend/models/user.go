package models

import (
	"gorm.io/gorm"
	"time"
)

type User struct {
	gorm.Model
	ID         uint
	Email      string `gorm:"unique"`
	Password   string
	Name       string
	Surename   string
	ProviderID string `gorm:"unique"`
	CreatedAt  time.Time
	UpdatedAt  time.Time
	DeletedAt  *time.Time
}
