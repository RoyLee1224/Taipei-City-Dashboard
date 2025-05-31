package models

// ComponentTranslation represents the structure of components_translations table
type ComponentTranslation struct {
	ComponentID     int    `json:"component_id" gorm:"primaryKey;column:component_id"`
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