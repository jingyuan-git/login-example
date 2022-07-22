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
	ID        uint   `json:"id,omitempty"`
	Identity  string `json:"identity,omitempty"`
	Name      string `json:"name,omitempty"`
	Password  string `json:"password,omitempty"`
	PassNum   int64  `json:"passNum,omitempty"`
	SubmitNum int64  `json:"submitNum,omitempty"`
	Mail      string `json:"mail,omitempty"`
}

func (a *User) Register() error {
	// 数据的插入
	userIdentity := helper.GetUUID()

	user := models.UserBasic{
		CreatedAt: time.Now(),
		Name:      a.Name,
		Identity:  userIdentity,
		Password:  helper.GetMd5(a.Password),
		Mail:      a.Mail,
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
	userMap["mail"] = a.Mail
	userMap["password"] = helper.GetMd5(a.Password)

	users, err := models.GetUser(userMap)
	if err != nil {
		log.Default().Printf("fail to list all orders, error: %+v \n", err)
		return nil, err
	}

	return users, nil
}

// func Login(c *gin.Context) {
// 	username := c.PostForm("username")
// 	password := c.PostForm("password")
// 	if username == "" || password == "" {
// 		c.JSON(http.StatusOK, gin.H{
// 			"code": -1,
// 			"msg":  "必填信息为空",
// 		})
// 		return
// 	}
// 	password = helper.GetMd5(password)

// 	data := new(models.UserBasic)
// 	token, err := helper.GenerateToken(data.Identity, data.Name, data.IsAdmin)
// 	if err != nil {
// 		c.JSON(http.StatusOK, gin.H{
// 			"code": -1,
// 			"msg":  "GenerateToken Error:" + err.Error(),
// 		})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{
// 		"code": 200,
// 		"data": map[string]interface{}{
// 			"token":    token,
// 			"is_admin": data.IsAdmin,
// 		},
// 	})
// }

// func Register(c *gin.Context) {
// 	mail := c.PostForm("mail")
// 	userCode := c.PostForm("code")
// 	name := c.PostForm("name")
// 	password := c.PostForm("password")
// 	phone := c.PostForm("phone")
// 	if mail == "" || userCode == "" || name == "" || password == "" {
// 		c.JSON(http.StatusOK, gin.H{
// 			"code": -1,
// 			"msg":  "参数不正确",
// 		})
// 		return
// 	}

// 	// 数据的插入
// 	userIdentity := helper.GetUUID()
// 	data := &models.UserBasic{
// 		Identity: userIdentity,
// 		Name:     name,
// 		Password: helper.GetMd5(password),
// 		Phone:    phone,
// 		Mail:     mail,
// 	}

// 	// 生成 token
// 	token, err := helper.GenerateToken(userIdentity, name, data.IsAdmin)
// 	if err != nil {
// 		c.JSON(http.StatusOK, gin.H{
// 			"code": -1,
// 			"msg":  "Generate Token Error:" + err.Error(),
// 		})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{
// 		"code": 200,
// 		"data": map[string]interface{}{
// 			"token": token,
// 		},
// 	})
// }
