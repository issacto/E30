package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// Me handler calls services for getting
// a user's details
func (h *Handler) Me(c *gin.Context) {
	// A *model.User will eventually be added to context in middleware
	c.JSON(http.StatusOK, gin.H{
		"hello": "it's image",
	})

}
