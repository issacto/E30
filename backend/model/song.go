package model

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
)

type Song struct {
	Name      string
	Listeners int
	Artist    string
}

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
	print("body")
	fmt.Println(string(body))
	print(body)
	if err != nil {
		fmt.Println(err)
		return tempSong, err
	}
	return tempSong, err

}
