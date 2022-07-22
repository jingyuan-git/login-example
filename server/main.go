package main

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"

	"server/models"
	"server/pkg/logging"
	"server/pkg/setting"
	"server/routers"
)

func init() {
	setting.Setup()
	models.Setup()
	logging.Setup()
}

func main() {
	gin.SetMode(setting.ServerSetting.RunMode)

	routersInit := routers.InitRouter()
	readTimeout := time.Duration(setting.ServerSetting.ReadTimeout) * time.Second
	writeTimeout := time.Duration(setting.ServerSetting.WriteTimeout) *	 time.Second
	addrUrl := fmt.Sprintf("%s:%d", setting.ServerSetting.Host, setting.ServerSetting.HttpPort)
	maxHeaderBytes := 1 << 20

	server := &http.Server{
		Addr:           addrUrl,
		Handler:        routersInit,
		ReadTimeout:    readTimeout,
		WriteTimeout:   writeTimeout,
		MaxHeaderBytes: maxHeaderBytes,
	}

	log.Printf("[info] start http server listening %s", addrUrl)

	if err := server.ListenAndServe(); err != nil {
		log.Printf("[error] fail to listen http server %s", err)
	}
}
