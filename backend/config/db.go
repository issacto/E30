// Define the package interacting with the database
package config

import (
	"context"
	"log"
	"os"

	"github.com/jackc/pgx/v4"
	"github.com/joho/godotenv"
)

var Conn pgx.Conn

// DBConnection defines the connection structure
func Connect() {
	// var cockroachdb_url = os.Getenv("COCKROACH_DATABASE_URL")
	// print("cockroachdb_url", cockroachdb_url)
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	cockroachdb_url := os.Getenv("COCKROACH_DATABASE_URL")
	config, err := pgx.ParseConfig(cockroachdb_url)

	if err != nil {
		log.Fatal("error configuring the database: ", err)
	}

	// Connect to the "bank" database.
	conn, err := pgx.ConnectConfig(context.Background(), config)
	Conn = *conn
	if err != nil {
		log.Fatal("error connecting to the database: ", err)
	}
}

func GetDB() pgx.Conn {
	return Conn
}
