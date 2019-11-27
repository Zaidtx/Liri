require('dotenv').config();
const inuirer = reuire('inquirer');
const axios = reuire("axios");
const spotify = require('node-spotify-api');
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
        'search for song',
        'search for movie',
        'search for an event'

    ],
    message: 'what do you do?',
    name:'action'
},
  {  
        type: 'input',
        message: 'What do you want to seatch for?',
        name: 'searchFor'


    }

];

const areYouDone = [
    {
        type: 'confim',
        message: 'Search for somthing else?',
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
        case "search for a song": getSongInfo(searchFor);
        break;
        case "Search for a Movie": getMovieInfro(searchFor);
        break;
        case "Search for event": getEventInfo(searchFor);
        break;
        default: console.log("I don't know what are you talking about");


    }

}

function getSongInfo(song) {
    console.log("sptify api");
    spotify.searhc({ type: 'track', query: song,limit:5 }, function(err,data) {
        if (err) {
            return console.log('Error occurred' + err);

        }
        
        //console log 
        const songs =data.tracks.items;
        for(var i=0; i<songs.length; i++){
            console.log("Artist: " +songs[i].artists[0].name);
            console.log("Song Name: " +songs[i].name);
            console.log("Preview Song: " +songs[i].preview_url);
            console.log("Album: " +songs[i].album.name)
            console.log("_____________________")
        }
    });
}

