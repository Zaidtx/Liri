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

