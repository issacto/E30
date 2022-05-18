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

	"github.com/joho/godotenv"
)

type Song struct {
	Name      string
	Listeners string
	Artist    string
}

type SongOutput struct {
	Name      string
	Listeners string
	Artist    string
	Date      time.Time
}

type EmailInput struct {
	Email string
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
	Email string
	Song  Song
}

type FavSongDeletion struct {
	Email string
	Name  string
	Date  string
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

	print("f.email")
	print(f.Email)
	conn := config.GetDB()
	if _, err := conn.Exec(context.Background(),
		"CREATE TABLE IF NOT EXISTS UserFavSongs (Email String, Name String, Listeners String, Artist String, Date TIMESTAMPTZ NOT NULL DEFAULT NOW())"); err != nil {
		print(err)
		return err

	}
	if _, err := conn.Exec(context.Background(),
		"INSERT INTO UserFavSongs (Email, Name, Listeners, Artist) VALUES ($1, $2, $3, $4 )", f.Email, f.Song.Name, f.Song.Listeners, f.Song.Artist); err != nil {

		return err
	}
	return nil

}

func (f *FavSongDeletion) DELETEFAVSONG() error {

	conn := config.GetDB()
	if _, err := conn.Exec(context.Background(),
		"CREATE TABLE IF NOT EXISTS UserFavSongs (Email String, Name String, Listeners String, Artist String, Date TIMESTAMPTZ NOT NULL DEFAULT NOW())"); err != nil {
		print(err)
		return err

	}
	if _, err := conn.Exec(context.Background(),
		"DELETE  FROM USERFAVSONGS WHERE email=$1 and name=$2 and date=$3", f.Email, f.Name, f.Date); err != nil {

		return err
	}
	return nil

}

func (e *EmailInput) GETFAVSONGS() ([]SongOutput, error) {

	var rowSlice []SongOutput
	conn := config.GetDB()

	if _, err := conn.Exec(context.Background(),
		"CREATE TABLE IF NOT EXISTS UserFavSongs (Email String, Name String, Listeners String, Artist String, Date TIMESTAMPTZ NOT NULL DEFAULT NOW())"); err != nil {
		print(err)
		return rowSlice, err
	}
	print("e.email")
	print(e.Email)
	rows, err := conn.Query(context.Background(), "SELECT Name, Listeners, Artist, Date FROM UserFavSongs where Email = $1", e.Email)

	for rows.Next() {
		var s SongOutput
		err := rows.Scan(&s.Name, &s.Listeners, &s.Artist, &s.Date)
		if err != nil {
			return rowSlice, err
		}
		rowSlice = append(rowSlice, s)
	}

	if err != nil {
		return rowSlice, err
	}

	return rowSlice, nil

}
