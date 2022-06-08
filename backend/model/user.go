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

type SignUpUser struct {
	Age      int    `binding:"required"`
	Email    string `db:"email" json:"email" binding:"required"`
	Name     string `db:"name" json:"name" binding:"required"`
	Password string `db:"password" binding:"required"`
}

type LoginCheck struct {
	Email    string
	Password string
}

func (su *SignUpUser) SIGNUP() error {
	conn := config.GetDB()
	if _, err := conn.Exec(context.Background(),
		"CREATE TABLE IF NOT EXISTS Users (id uuid DEFAULT uuid_generate_v4(), email STRING PRIMARY KEY, password STRING, name STRING, age Integer)"); err != nil {
		print(err)
		return err

	}
	if _, err := conn.Exec(context.Background(),
		"INSERT INTO Users (email, password, name, age) VALUES ($1, $2, $3, $4)", su.Email, su.Password, su.Name, su.Age); err != nil {

		return err
	}
	return nil

}

func (l *LoginCheck) SIGNIN() bool {

	conn := config.GetDB()
	fmt.Print(l)
	fmt.Println("err")
	rows, err := conn.Query(context.Background(), "SELECT * FROM Users where email = $1 and password = $2", l.Email, l.Password)
	if err != nil {
		err = nil
		return false
	}
	defer rows.Close()
	if rows.Next() {
		return true
	}
	print("hi")
	print(rows)
	err = nil
	return false

}
