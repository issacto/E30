package user

import (
	"E30/model"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
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
	g := c.R.Group("/api/user")

	g.POST("/signup", h.Signup)
	g.POST("/signin", h.Signin)
	g.GET("/getFavSongs", h.GetFavSongs)
	g.POST("/insertFavSong", h.InsertFavSong)
	g.DELETE("/deleteFavSong", h.deleteFavSong)
}

// Signup handler
func (h *Handler) Signup(c *gin.Context) {
	var newUser model.SignUpUser
	if err := c.ShouldBindBodyWith(&newUser, binding.JSON); err != nil {
		print("Inside")
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err,
		})
		return
	}
	print("Outside")
	response := newUser.SIGNUP()
	if response != nil {
		c.JSON(http.StatusConflict, gin.H{
			"error": response,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"hello": "it's signup",
	})
}

// Signin handler
func (h *Handler) Signin(c *gin.Context) {
	var loginCheck model.LoginCheck
	if err := c.ShouldBindBodyWith(&loginCheck, binding.JSON); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err,
		})
		return
	}
	response := loginCheck.SIGNIN()
	if !response {
		c.JSON(http.StatusConflict, gin.H{
			"error": "failed to login",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"hello": response,
	})
}

// Signin handler
func (h *Handler) InsertFavSong(c *gin.Context) {
	var favSongInsertion model.FavSongInsertion
	if err := c.ShouldBindBodyWith(&favSongInsertion, binding.JSON); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err,
		})
		return
	}
	response := favSongInsertion.INSERTFAVSONG()
	if response != nil {
		c.JSON(http.StatusConflict, gin.H{
			"wasSuccessful": false,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"wasSuccessful": true,
	})
}

func (h *Handler) deleteFavSong(c *gin.Context) {
	var favSongInsertion model.FavSongDeletion
	if err := c.ShouldBindBodyWith(&favSongInsertion, binding.JSON); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err,
		})
		return
	}
	response := favSongInsertion.DELETEFAVSONG()
	if response != nil {
		c.JSON(http.StatusConflict, gin.H{
			"wasSuccessful": false,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"wasSuccessful": true,
	})
}

func (h *Handler) GetFavSongs(c *gin.Context) {
	var emailInput model.EmailInput
	print("here")
	print("here")
	if err := c.Bind(&emailInput); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err,
		})
		return
	}
	print(emailInput.Email)
	response, err := emailInput.GETFAVSONGS()
	print(response)
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{
			"error": err,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": response,
	})
}
