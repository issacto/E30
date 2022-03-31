package model

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"time"
)

type Song struct {
	Name      string
	Listeners int
	Artist    string
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

var myClient = &http.Client{Timeout: 10 * time.Second}

func GETDAILYSONGS() (Song, error) {

	tempSong := Song{}
	url := os.Getenv("LASTFM_URL")
	method := "GET"

	client := &http.Client{}
	req, err := http.NewRequest(method, url, nil)

	if err != nil {
		fmt.Println(err)
		return tempSong, err
	}
	res, err := client.Do(req)
	if err != nil {
		fmt.Println(err)
		return tempSong, err
	}
	defer res.Body.Close()

	body, err := ioutil.ReadAll(res.Body)
	// fmt.Println(string(body))
	fmt.Println(string(body))
	if err != nil {
		fmt.Println(err)
		return tempSong, err
	}
	var data SongsReponse
	json.Unmarshal(body, &data)
	fmt.Printf("Results: %v\n", data.Tracks.Attr)
	// r, err := myClient.Get(url)
	// if err != nil {
	// 	return tempSong, err
	// }
	// defer r.Body.Close()
	// log.Print()
	// var x = json.NewDecoder(r.Body).Decode(&tempSong)
	// log.Print("tempSong")
	// // log.Print(x)
	return Song{}, err

}
