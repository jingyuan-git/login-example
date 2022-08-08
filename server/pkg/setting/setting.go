package setting

import (
	"fmt"
	"log"
	"os"

	"github.com/go-ini/ini"
)

type Server struct {
	RunMode  string
	Host     string
	HttpPort int

	ReadTimeout  int
	WriteTimeout int
	PageSize     int

	RuntimeRootPath string
	LogSavePath     string
	LogSaveName     string
	LogFileExt      string
	TimeFormat      string
}

var ServerSetting = &Server{}

type Database struct {
	Type     string
	User     string
	Password string
	Host     string
	Port     string
	Name     string
	TimeZone string
	DataPath string
}

var DatabaseSetting = &Database{}

var cfg *ini.File

func Setup(env *string) {
	var err error
	str, _ := os.Getwd()
	fmt.Println(str)
	cfg, err = ini.Load("./conf/app.ini")
	if err != nil {
		log.Fatalf("setting.Setup, fail to parse 'conf/app.ini': %v", err)
	}

	mapTo("server", ServerSetting)
	mapTo("database", DatabaseSetting)

	// set the host of database based on the node environment
	devHost, err := cfg.Section("database").GetKey("DevHost")
	prodHost, err := cfg.Section("database").GetKey("ProdHost")

	if *env == "dev" {
		DatabaseSetting.Host = devHost.String()
	}
	if *env == "prod" {
		DatabaseSetting.Host = prodHost.String()
	}

	log.Printf("the settings are successfully loaded")
}

// mapTo map section
func mapTo(section string, v interface{}) {
	err := cfg.Section(section).MapTo(v)
	if err != nil {
		log.Fatalf("Cfg.MapTo %s err: %v", section, err)
	}
}
