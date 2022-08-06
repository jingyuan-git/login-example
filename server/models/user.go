package models

import (
	"fmt"
	"time"
)

type UserBasic struct {
	Identity  string    `gorm:"column:identity;type:varchar(36);" json:"identity"` // 用户的唯一标识
	CreatedAt time.Time `json:"created_at"`
	Nickname  string    `gorm:"column:nickname;type:varchar(100);" json:"nickname"`       // 用户名
	Password  string    `gorm:"column:password;type:varchar(32);" json:"password"`        // 密码
	Phone     string    `gorm:"column:phone;type:varchar(20);" json:"phone"`              // 手机号
	Email     string    `gorm:"column:email;type:varchar(100);uniqueIndex;" json:"email"` // 邮箱
	Gender    string    `gorm:"column:gender;type:varchar(10);" json:"gender"`            // 性别
}

// Create insert the value into database
func CreateUser(p UserBasic) error {
	fmt.Println(p)
	if err := db.Create(p).Error; err != nil {
		return err
	}
	return nil
}

// GetOrders gets a list of orders based on paging constraints
func GetUser(maps map[string]interface{}) (*UserBasic, error) {
	results := &UserBasic{}
	fmt.Printf("GetUser maps %+v", maps)
	res := db.Debug().Model([]*UserBasic{}).Where("email = ? AND password = ? ", maps["email"], maps["password"]).First(&results)
	fmt.Println(results)
	if res.Error != nil {
		return nil, res.Error
	}
	return results, nil
}
