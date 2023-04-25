#!/usr/bin/node
import requests

movie_id = input("Enter the movie ID: ") # prompt user to enter movie ID
url = f"https://swapi.dev/api/films/{movie_id}/"

# make GET request to API endpoint for movie data
response = requests.get(url)

if response.status_code == 200:
    movie_data = response.json()
    character_urls = movie_data["characters"]
    characters = []

    # loop through each character URL and make GET request to get character data
    for character_url in character_urls:
        character_response = requests.get(character_url)
        if character_response.status_code == 200:
            character_data = character_response.json()
            characters.append(character_data["name"])

    # print character names in order of list "characters" in the /films/ response
    for character_url in character_urls:
        for character_name in characters:
            if character_name in character_url:
                print(character_name)
else:
    print(f"Error: Could not retrieve data for movie {movie_id}")

