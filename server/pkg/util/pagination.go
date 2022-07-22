package util

import (
	"server/pkg/setting"
)

// GetPage get page parameters
func GetPage(num int) int {
	result := 0
	page := num
	if page > 0 {
		result = (page - 1) * setting.ServerSetting.PageSize
	}

	return result
}
