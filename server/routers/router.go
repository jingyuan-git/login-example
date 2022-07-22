package routers

import (
	"github.com/gin-gonic/gin"

	"server/middleware/jwt"
	v1 "server/routers/v1"
)

// InitRouter initialize routing information
func InitRouter() *gin.Engine {
	r := gin.Default()
	r.Use(gin.Logger())
	r.Use(gin.Recovery())

	apiv1 := r.Group("/api/v1")
	apiv1.Use(jwt.CORSMiddleware())
	{
		apiv1.POST("/users/login", v1.Login)
		apiv1.POST("/users/register", v1.Register)
	}
	return r
}
