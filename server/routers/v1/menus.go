package v1

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"server/pkg/app"
	"server/pkg/e"
	// "server/service"
)

type Menu struct {
	Icon     string `json:"icon,omitempty"`
	Title    string `json:"title,omitempty"`
	Path     string `json:"path,omitempty"`
	Children []Menu `json:"children,omitempty"`
}

func GetMenus(c *gin.Context) {
	var (
		appG = app.Gin{C: c}
	)

	menus := []Menu{
		{
			Icon:  "HomeOutlined",
			Title: "Home Page",
			Path:  "/home/index",
		},
		{
			Icon:  "FundOutlined",
			Title: "Dashboard",
			Path:  "/dashboard",
		},
	}
	// if err != nil {
	// 	appG.Response(http.StatusInternalServerError, e.ERROR, nil)
	// 	return
	// }

	appG.Response(http.StatusOK, e.SUCCESS, menus)
}
