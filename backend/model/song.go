package model

import (
	"E30/config"
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"time"

	"github.com/google/uuid"
	"github.com/joho/godotenv"
)

type Song struct {
	Name      string
	Listeners string
	Artist    string
}

type UIDInput struct {
	uuid uuid.UUID
}

type attribute struct {
	Page       string
	PerPage    string
	TotalPages string
	Total      string
}

type streamable struct {
	Text      string `json:"#text"`
	Fulltrack string
}

type artist struct {
	Name string
	Mbid string
	Url  string
}

type image struct {
	Text string `json:"#text"`
	Size string
}

type track struct {
	Name       string
	Duration   string
	Playcount  string
	Listeners  string
	Mbid       string
	Url        string
	Streamable streamable
	Artist     artist
	Image      []image
}

type tracks struct {
	Track []track
	Attr  attribute `json:"@attr"`
}

type SongsReponse struct {
	Tracks tracks
}

type FavSongInsertion struct {
	UID  uuid.UUID `db:"uid" json:"uid" binding:"required"`
	Song Song
}

var myClient = &http.Client{Timeout: 10 * time.Second}

func GETDAILYSONGS() ([]Song, error) {

	songList := []Song{}
	err := godotenv.Load()
	url := os.Getenv("LASTFM_URL")
	method := "GET"
	client := &http.Client{}
	req, err := http.NewRequest(method, url, nil)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	res, err := client.Do(req)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	defer res.Body.Close()
	body, err := ioutil.ReadAll(res.Body)
	// fmt.Println(string(body))
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	var data SongsReponse
	json.Unmarshal(body, &data)

	for _, track := range data.Tracks.Track {
		print(track.Name)
		songList = append(songList, Song{Name: track.Name, Listeners: track.Listeners, Artist: track.Artist.Name})
	}

	return songList, err

}

func (f *FavSongInsertion) INSERTFAVSONG() error {

	conn := config.GetDB()
	if _, err := conn.Exec(context.Background(),
		"CREATE TABLE IF NOT EXISTS UserFavSongs (id UUID PRIMARY KEY, songName String, listeners String, artist String, date DATE NOT DEFAULT CURRENT_DATE)"); err != nil {
		print(err)
		return err

	}
	if _, err := conn.Exec(context.Background(),
		"INSERT INTO UserFavSongs (id, songName, listeners, artist, date) VALUES ($1, $2, $3, $4, $5 )", f.UID, f.Song.Name, f.Song.Listeners, f.Song.Artist); err != nil {

		return err
	}
	return nil

}

func (u *UIDInput) GETFAVSONGS() ([]Song, error) {

	conn := config.GetDB()
	rows, err := conn.Query(context.Background(), "SELECT * FROM UserFavSongs where id = $", u.uuid)
	if err != nil {
		return nil, err
	}
	if rows.Next() {
		return nil, nil
	}
	defer rows.Close()

	return nil, err

}
