const express = require('express');
const AlchemyLanguage = require('watson-developer-cloud/alchemy-language/v1');
const alchemyApiKey = {api_key: process.env.ALCHEMY_API_KEY || 'e159c11d8dda60a89823f4871028767ebecfe68b'}
const alchemy_language = new AlchemyLanguage(alchemyApiKey)

// cfenv provides access to your Cloud Foundry environment
const cfenv = require('cfenv');



const async = require('async');
const bodyParser = require('body-parser');
const handlebars = require('handlebars');
const hbs = require('hbs');
const path = require('path');
const Q = require('q');

const app = express();


// create db 
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:/myApp');
const db = mongoose.connection;

// stock model
const Stock = require('./models/Stock');
const seed = require('./seed');
const sentiment = require('./sentiment');

// middleware

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
const appEnv = cfenv.getAppEnv();

app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'bower_components')))
app.use(bodyParser());


// seed.seedDatabase();
sentiment.getSentiment("58ba2b1195244e589eedcefb");
sentiment.getSentiment("58ba2b1195244e589eedcefc");
sentiment.getSentiment("58ba2b1195244e589eedcefd");






app.get('/', (req, response) =>{ 

});

app.listen(3000, () => {
    console.log("listening on port 3000");
});