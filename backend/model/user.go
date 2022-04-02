package model

import (
	"E30/config"
	"context"
	"fmt"

	"github.com/google/uuid"
)

// User defines domain model and its json and db representations
type User struct {
	UID      uuid.UUID `db:"uid" json:"uid" binding:"required"`
	Email    string    `db:"email" json:"email" binding:"required"`
	Name     string    `db:"name" json:"name" binding:"required"`
	Password string    `db:"password" binding:"required"`
}


type LoginCheck struct {
	Email    string
	Password string
}

func (u *User) SIGNUP() error {

	conn := config.GetDB()
	if _, err := conn.Exec(context.Background(),
		"CREATE TABLE IF NOT EXISTS Users (id UUID PRIMARY KEY, email STRING, password STRING, name STRING)"); err != nil {
		print(err)
		return err

	}
	if _, err := conn.Exec(context.Background(),
		"INSERT INTO Users (id, email, password, name) VALUES ($1, $2, $3, $4 )", u.UID, u.Email, u.Password, u.Name); err != nil {

		return err
	}
	return nil

}

func (l *LoginCheck) SIGNIN() bool {

	conn := config.GetDB()
	fmt.Print(l)
	rows, err := conn.Query(context.Background(), "SELECT * FROM Users where email = $1 and password = $2", l.Email, l.Password)
	if err != nil {
		return false
	}
	if rows.Next() {
		return true
	}
	defer rows.Close()

	return false

}
