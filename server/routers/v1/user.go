package v1

import (
	// "fmt"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"

	"server/helper"
	"server/pkg/app"
	"server/pkg/e"

	// "server/pkg/setting"
	// "server/pkg/util"
	// "server/models"
	"server/service"
)

func Login(c *gin.Context) {
	var (
		appG        = app.Gin{C: c}
		userService service.User
	)

	if err := c.ShouldBindJSON(&userService); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	fmt.Printf("Login userService %+v", userService)

	user, err := userService.GetUser()
	if err != nil {
		appG.Response(http.StatusInternalServerError, e.ERROR, nil)
		return
	}

	token, err := helper.GenerateToken(user.Identity, user.Mail)

	data := make(map[string]interface{})
	data["token"] = token

	appG.Response(http.StatusOK, e.SUCCESS, data)
}

func Register(c *gin.Context) {
	var (
		appG = app.Gin{C: c}
	)
	userService := service.User{}

	if err := c.ShouldBindJSON(&userService); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := userService.Register()
	if err != nil {
		appG.Response(http.StatusInternalServerError, e.ERROR, nil)
		return
	}

	data := make(map[string]interface{})

	appG.Response(http.StatusOK, e.SUCCESS, data)
}
