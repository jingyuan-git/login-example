package models

import (
	"fmt"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gocarina/gocsv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"server/pkg/setting"
)

var db *gorm.DB

// Setup initializes the database instance
func Setup() {
	var data_source string
	var err error

	if setting.DatabaseSetting.Type == "postgres" {
		data_source = fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=%s",
			setting.DatabaseSetting.Host,
			setting.DatabaseSetting.User,
			setting.DatabaseSetting.Password,
			setting.DatabaseSetting.Name,
			setting.DatabaseSetting.Port,
			setting.DatabaseSetting.TimeZone,
		)
	} else {
		log.Fatalf("[error] sorry, the current database type is not yet supported")
	}

	db, err = gorm.Open(postgres.Open(data_source), &gorm.Config{
		DisableForeignKeyConstraintWhenMigrating: true,
	})
	if err != nil {
		panic(err)
	}

	// Migrate order associated table
	db.AutoMigrate(
		[]UserBasic{},
	)

	// if err := createDB([]Pomodoro{}); err != nil {
	// 	log.Default().Panicf("[error] the Pomodoro database is failed to create. Error: %+v", err)
	// }

	// if err := createDB([]Todo{}); err != nil {
	// 	log.Default().Panicf("[error] the Todo database is failed to create. Error: %+v", err)
	// }

	log.Default().Printf("the databases are successfully loaded")
}

// importDB parses the CSV from the file in the interface
// and insert the value into database.
func importDB[V any](path string, s V) error {
	file, err := os.Open(path)
	if err != nil {
		return err
	}
	defer file.Close()

	err = gocsv.Unmarshal(file, &s)
	if err != nil {
		return err
	}

	result := db.Create(s)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func createDB[V any](s V) error {
	result := db.Create(s)
	if result.Error != nil {
		return result.Error
	}
	return nil
}
