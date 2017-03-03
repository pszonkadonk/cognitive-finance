const AlchemyLanguage = require('watson-developer-cloud/alchemy-language/v1');
const alchemyApiKey = {api_key: process.env.ALCHEMY_API_KEY || 'e159c11d8dda60a89823f4871028767ebecfe68b'}
const alchemy_language = new AlchemyLanguage(alchemyApiKey);
const request = require('request');
const rp = require('request-promise');
const feedparser = require('feedparser-promised');
const Q = require('q');



function parseRss(rss) {
    let options = {
        uri: `http://finance.yahoo.com/rss/headline?s=${rss}`
    }; 
    console.log("I got called by" + rss);

    return feedparser.parse(options);
}

// function getSentiment(ticker, name) {

  
// }


module.exports = {
    parseRss: parseRss
};