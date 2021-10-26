# Welcome to SoundTrotter!

SoundTrotter encourages users to explore music from around the world. It takes your recent Spotify listening history and plots it on an interactive world map, allowing you find the gaps and fill them. 

#### Motivation

In the 2019 Spotify Wrapped, Spotify praised users as "World Citizens" for listening to obscure international artists like ABBA. It listed the top 5 countries you had listened to most, but this was usually predictable western countries like the US or UK, rather than any information about the 30 other countries it claimed you had listened to. SoundTrotter lets users analyse their recent listening to determine for themselves whether they really are a "World Citizen". 

If we stay in the music bubbles of our own coutnries, we miss out on engaging with music and culture different from our own. Music listening is very diverse around the world. Entire genres popular in Russia may be completely absent in New Zealand. SoundTrotter lets users explore popular music around the world and generate a playlist to expand their listening to countries they haven't covered yet.

## Quick start guide:


### Install the dependencies

- Navigate to SoundTrotter folder

Using npm:
```
npm install
```
Using yarn:
```
yarn install
```
### Run the webapp in development mode

run:
```
npm start
```

The app should open in your default browser (must be either Google Chrome or Microsoft Edge) at localhost:3000.
When prompted, enter your spotify credentials, and allow the app to connect to your spotify account.

### To test the webapp:

run:
```
npm test
```

## App Features:

#### World map:

Upon loading the app, the world map will gradually light up green as we use spotify, musicBrainz, and AudioDB to evaluate what countries you've covered in your recent spotify listening. These countries will appear in green. Unfortunately, we may not be able to match a country to every artist you've listened to, especially smaller artists.

Click on the world map to see details for that country, such as the current top song in that country, and what artists (if any) you've listened to from that country. 

#### Playlist Generation

Click the top tab to generate a playlist for the countries that you haven't yet listened to. Please be patient as this process can take a few minutes depending on the number of countries that you haven't listened to.

#### Song Playback

To be able to use the song playback, you must be logged in to a Spotify premium account.

Click on a country to see options for listening to music from that country.

Click on the play/pause button on the bottom bar to control song playback. This player is linked to your spotify account, so you can't use the web app and listen to spotify at the same time. 


## Development Details

#### APIs Used

* Spotify - Needed for getting listening history, getting charts, playing songs and creating playlists
* MusicBrainz - Used for finding the country of an artist, as well as sourcing artists from a particular country.
* AudioDB - Used for additional data on the country of artists as the rate limiting was less severe than MusicBrainz.

#### Original Team

SoundTrotter was originally developed for the SOFTENG 750 project by team Maroon Monkey. This version is currently being maintained and developed by NoahJade.

| Team Member     | Github Username |
|-----------------|-----------------|
| Max Gurr        | AngstyLemon     |
| Eva-Rae McLean  | EvaRae          |
| Sarah Trenberth | Saaaaraaaah     |
| Noah Williams   | NoahJade        |

