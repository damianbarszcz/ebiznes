package config

import (
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"os"
)

type Config struct {
	OauthConf        *oauth2.Config
	OauthStateString string
	JwtKey           []byte
}

func NewConfig() *Config {
	return &Config{
		OauthConf: &oauth2.Config{
			ClientID:     os.Getenv("GOOGLE_CLIENT_ID"),
			ClientSecret: os.Getenv("GOOGLE_CLIENT_SECRET"),
			RedirectURL:  "http://localhost:8000/api/auth/google/callback",
			Scopes: []string{
				"https://www.googleapis.com/auth/userinfo.email",
				"https://www.googleapis.com/auth/userinfo.profile",
			},
			Endpoint: google.Endpoint,
		},
		OauthStateString: "random",
		JwtKey:           []byte(os.Getenv("JWT_SECRET")),
	}
}
