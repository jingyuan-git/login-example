package service

import (
	"fmt"
	"log"
	// "net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	// "github.com/gin-gonic/gin"

	"server/helper"
	"server/models"
)

type UserClaims struct {
	Identity string `json:"identity"`
	Name     string `json:"name"`
	jwt.StandardClaims
}

type User struct {
	Nickname string `json:"nickname,omitempty"`
	Password string `json:"password,omitempty"`
	Phone    string `json:"phone,omitempty"`
	Email    string `json:"email,omitempty"`
	Gender   string `json:"gender,omitempty"`
}

func (a *User) Register() error {
	// add data
	userIdentity := helper.GetUUID()

	user := models.UserBasic{
		CreatedAt: time.Now(),
		Nickname:  a.Nickname,
		Identity:  userIdentity,
		Password:  helper.GetMd5(a.Password),
		Email:     a.Email,
		Phone:     a.Phone,
		Gender:    a.Gender,
	}

	fmt.Printf("service %+v/n", user)
	if err := models.CreateUser(user); err != nil {
		fmt.Println(err.Error())
		return err
	}

	return nil
}

func (a *User) GetUser() (*models.UserBasic, error) {
	userMap := make(map[string]interface{})
	userMap["email"] = a.Email
	userMap["password"] = helper.GetMd5(a.Password)

	users, err := models.GetUser(userMap)
	if err != nil {
		log.Default().Printf("fail to list all orders, error: %+v \n", err)
		return nil, err
	}

	return users, nil
}
