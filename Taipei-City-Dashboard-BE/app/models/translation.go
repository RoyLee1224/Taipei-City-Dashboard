package models

// ComponentTranslation represents the structure of components_translations table
type ComponentTranslation struct {
	ComponentID     int    `json:"component_id" gorm:"primaryKey;column:component_id"`
	LanguageCode    string `json:"language_code" gorm:"primaryKey;column:language_code"`
	NameTranslation string `json:"name_translation" gorm:"column:name_translation"`
}

// DashboardTranslation represents the structure of dashboards_translations table
type DashboardTranslation struct {
	DashboardID     int    `json:"dashboard_id" gorm:"primaryKey;column:dashboard_id"`
	LanguageCode    string `json:"language_code" gorm:"primaryKey;column:language_code"`
	NameTranslation string `json:"name_translation" gorm:"column:name_translation"`
}

// GetAllComponentTranslations retrieves all component translations from database
func GetAllComponentTranslations(languageCode string) (map[int]string, error) {
	var translations []ComponentTranslation
	var result = make(map[int]string)

	// Query the database for all translations of the specified language
	if err := DBManager.Table("components_translations").
		Where("language_code = ?", languageCode).
		Find(&translations).Error; err != nil {
		return nil, err
	}

	// Convert to map for easier lookup
	for _, translation := range translations {
		result[translation.ComponentID] = translation.NameTranslation
	}

	return result, nil
}

// GetComponentTranslationByID retrieves a specific component translation
func GetComponentTranslationByID(componentID int, languageCode string) (string, error) {
	var translation ComponentTranslation

	if err := DBManager.Table("components_translations").
		Where("component_id = ? AND language_code = ?", componentID, languageCode).
		First(&translation).Error; err != nil {
		return "", err
	}

	return translation.NameTranslation, nil
}

// CreateComponentTranslation creates a new component translation
func CreateComponentTranslation(componentID int, languageCode string, nameTranslation string) error {
	translation := ComponentTranslation{
		ComponentID:     componentID,
		LanguageCode:    languageCode,
		NameTranslation: nameTranslation,
	}

	if err := DBManager.Table("components_translations").Create(&translation).Error; err != nil {
		return err
	}

	return nil
}

// UpdateComponentTranslation updates an existing component translation
func UpdateComponentTranslation(componentID int, languageCode string, nameTranslation string) error {
	if err := DBManager.Table("components_translations").
		Where("component_id = ? AND language_code = ?", componentID, languageCode).
		Update("name_translation", nameTranslation).Error; err != nil {
		return err
	}

	return nil
}

// DeleteComponentTranslation deletes a component translation
func DeleteComponentTranslation(componentID int, languageCode string) error {
	if err := DBManager.Table("components_translations").
		Where("component_id = ? AND language_code = ?", componentID, languageCode).
		Delete(&ComponentTranslation{}).Error; err != nil {
		return err
	}

	return nil
}

// Dashboard Translation Functions

// GetAllDashboardTranslations retrieves all dashboard translations from database
func GetAllDashboardTranslations(languageCode string) (map[int]string, error) {
	var translations []DashboardTranslation
	var result = make(map[int]string)

	// Query the database for all translations of the specified language
	if err := DBManager.Table("dashboards_translations").
		Where("language_code = ?", languageCode).
		Find(&translations).Error; err != nil {
		return nil, err
	}

	// Convert to map for easier lookup
	for _, translation := range translations {
		result[translation.DashboardID] = translation.NameTranslation
	}

	return result, nil
}

// GetDashboardTranslationByID retrieves a specific dashboard translation
func GetDashboardTranslationByID(dashboardID int, languageCode string) (string, error) {
	var translation DashboardTranslation

	if err := DBManager.Table("dashboards_translations").
		Where("dashboard_id = ? AND language_code = ?", dashboardID, languageCode).
		First(&translation).Error; err != nil {
		return "", err
	}

	return translation.NameTranslation, nil
}

// CreateDashboardTranslation creates a new dashboard translation
func CreateDashboardTranslation(dashboardID int, languageCode string, nameTranslation string) error {
	translation := DashboardTranslation{
		DashboardID:     dashboardID,
		LanguageCode:    languageCode,
		NameTranslation: nameTranslation,
	}

	if err := DBManager.Table("dashboards_translations").Create(&translation).Error; err != nil {
		return err
	}

	return nil
}

// UpdateDashboardTranslation updates an existing dashboard translation
func UpdateDashboardTranslation(dashboardID int, languageCode string, nameTranslation string) error {
	if err := DBManager.Table("dashboards_translations").
		Where("dashboard_id = ? AND language_code = ?", dashboardID, languageCode).
		Update("name_translation", nameTranslation).Error; err != nil {
		return err
	}

	return nil
}

// DeleteDashboardTranslation deletes a dashboard translation
func DeleteDashboardTranslation(dashboardID int, languageCode string) error {
	if err := DBManager.Table("dashboards_translations").
		Where("dashboard_id = ? AND language_code = ?", dashboardID, languageCode).
		Delete(&DashboardTranslation{}).Error; err != nil {
		return err
	}

	return nil
} 