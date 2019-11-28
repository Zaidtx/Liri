require('dotenv').config();
const inquirer = require('inquirer');
const axios = require("axios");
const Spotify = require('node-spotify-api');
const spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
});

const {
    OMDB_API_KEY,
    SPOTIFY_API_KEY,
    BANDS_IN_TOWN_API_KEY
} = process.env;

const questions = [
    {
        type: 'list',
        choices: [
            'Search for a song',
            'Search for a movie',
            'Search for an event'
        ],
        message: 'What do you do?',
        name: 'action'
    },
    {
        type: 'input',
        message: 'What do you want to search for?',
        name: 'searchFor'
    }
];

const areYouDone = [
    {
        type: 'confirm',
        message: 'Search for something else?',
        name: 'continue'
    }
];

function action() {
    inquirer.prompt(questions).then(function (response) {
        console.log(response, "\n======");
        callFunctions(response.action, response.searchFor);
        // CALL API CODE
        inquirer.prompt(areYouDone).then(function (searchAgain) {
            if (searchAgain.continue) {
                action();
            }
        });
    });
}
function callFunctions(action, searchFor) {
    switch (action) {
        case "Search for a song": getSongInfo(searchFor);
            break;
        case "Search for a movie": getMovieInfo(searchFor);
            break;
        case "Search for an event": getEventInfo(searchFor);
            break;
        default: console.log("I don;t know what you are taking about");
    }
}
function getSongInfo(song) {
    console.log("spotify api")
    spotify.search({ type: 'track', query: song,limit:5 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        //console.log(data.tracks.items[0]);
        const songs =data.tracks.items;
        for(let i=0; i<songs.length; i++){
            console.log("Artist: " +songs[i].artists[0].name);
            console.log("Song Name: " +songs[i].name);
            console.log("Preview Song: " +songs[i].preview_url);
            console.log("Album: " +songs[i].album.name)
            console.log("_____________________")
        }
    });
}
function getMovieInfo(movie) {
    console.log("movie info");
    if (movie === undefined) {
        movie = "Mr Nobody";
    }
    const queryURL = "http://www.omdbapi.com/?t=" + movie + "&apikey=" + process.env.OMDB_API_KEY;
    console.log(queryURL)
    axios.get(queryURL).then(function (responce) {
        //console.log(responce);
        console.log("Title: " + responce.data.Title);
        console.log("Year: " + responce.data.Year);
        console.log("Actors: " + responce.data.Actors);
        console.log("Plot: " + responce.data.Plot);
        console.log("Language: " + responce.data.Language);
        console.log("imdbRating: " + responce.data.imdbRating);

    })
}
function getEventInfo(event) {
    Console.LOG("EVENT INFO");
    const queryURl= "https:rest.bandsintown.com/artists/"+ artist +"/events?app_id=" + process.env.BANDS_IN_TOWN_API_KEY;
    axios.get(queryURl).then(function(responce){
        console.log(responce);
    console.log("dateTime: " + responce.data.datetime);
    console.log("month:" + responce.data.month);
    console.log("year:"+ responce.date.year);
    console.log("Day:"+ responce.date.day);
    
            
    })
}



action();



