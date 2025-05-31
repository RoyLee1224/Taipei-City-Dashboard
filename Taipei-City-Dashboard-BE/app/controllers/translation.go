// Package controllers stores all the controllers for the Gin router.
package controllers

import (
	"net/http"

	"TaipeiCityDashboardBE/app/models"

	"github.com/gin-gonic/gin"
)

/*
GetComponentTranslations retrieves all component translations for a specific language.
GET /api/v1/translation/components?language_code=en-US
*/
func GetComponentTranslations(c *gin.Context) {
	// Get the language code from query parameters
	languageCode := c.Query("language_code")
	if languageCode == "" {
		c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": "language_code is required"})
		return
	}

	// Get translations from database
	translations, err := models.GetAllComponentTranslations(languageCode)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": err.Error()})
		return
	}

	// Return the translations
	c.JSON(http.StatusOK, gin.H{"status": "success", "data": translations})
}

/*
CreateComponentTranslation creates a new component translation.
POST /api/v1/translation/components
Body: {
	"component_id": 1,
	"language_code": "en-US",
	"name_translation": "Component Name"
}
*/
func CreateComponentTranslation(c *gin.Context) {
	var req struct {
		ComponentID     int    `json:"component_id" binding:"required"`
		LanguageCode    string `json:"language_code" binding:"required"`
		NameTranslation string `json:"name_translation" binding:"required"`
	}

	// Bind JSON request body
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": err.Error()})
		return
	}

	// Create the translation
	err := models.CreateComponentTranslation(req.ComponentID, req.LanguageCode, req.NameTranslation)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "success", "message": "Translation created successfully"})
}

/*
UpdateComponentTranslation updates an existing component translation.
PATCH /api/v1/translation/components
Body: {
	"component_id": 1,
	"language_code": "en-US",
	"name_translation": "Updated Component Name"
}
*/
func UpdateComponentTranslation(c *gin.Context) {
	var req struct {
		ComponentID     int    `json:"component_id" binding:"required"`
		LanguageCode    string `json:"language_code" binding:"required"`
		NameTranslation string `json:"name_translation" binding:"required"`
	}

	// Bind JSON request body
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": err.Error()})
		return
	}

	// Update the translation
	err := models.UpdateComponentTranslation(req.ComponentID, req.LanguageCode, req.NameTranslation)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "success", "message": "Translation updated successfully"})
} 