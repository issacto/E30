package song

import (
	"E30/model"
	"net/http"

	"github.com/gin-gonic/gin"
)

// Handler struct holds required services for handler to function
type Handler struct {
	UserService model.UserService
}

// Config will hold services that will eventually be injected into this
// handler layer on handler initialization
type Config struct {
	R           *gin.Engine
	UserService model.UserService
}

// NewHandler initializes the handler with required injected services along with http routes
// Does not return as it deals directly with a reference to the gin Engine
func Router(c *Config) {
	// Create an account group
	// Create a handler (which will later have injected services)
	h := &Handler{
		UserService: c.UserService,
	}

	// Create a group, or base url for all routes
	g := c.R.Group("/api/song")
	g.GET("/getDailySongs", h.GetDailySongs)
	g.POST("/addNewSong", h.AddNewSong)
	g.POST("/deleteSong", h.DeleteSong)
	g.GET("/getNewSongs", h.GetNewSongs)
}

// Stripe here
func (h *Handler) GetDailySongs(c *gin.Context) {
	response, err := model.GETDAILYSONGS()
	c.JSON(http.StatusOK, gin.H{
		"error": err,
		"data":  response,
	})
}

// Tokens handler
func (h *Handler) AddNewSong(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"hello": "it's tokens",
	})
}

func (h *Handler) DeleteSong(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"hello": "it's tokens",
	})
}

// Image handler
func (h *Handler) GetNewSongs(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"hello": "it's image",
	})
}
