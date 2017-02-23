/*eslint-env node*/

//------------------------------------------------------------------------------
// Cognitive Finance IBM Watson Alchemy Application
//------------------------------------------------------------------------------

// This application uses express as its web server
var express = require('express');
//  Alchemy API
var AlchemyLanguage = require('watson-developer-cloud/alchemy-language/v1');
//  Alchemy News API
var AlchemyDataNewsV1 = require('watson-developer-cloud/alchemy-data-news/v1');

// Alchemy API Key
var alchemyApiKey = {api_key: process.env.ALCHEMY_API_KEY || 'e159c11d8dda60a89823f4871028767ebecfe68b'}

var alchemy_language = new AlchemyLanguage(alchemyApiKey)

var alchemy_data_news = new AlchemyDataNewsV1(alchemyApiKey)

// cfenv provides access to your Cloud Foundry environment
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();






// Alchemy Code



// var params = {
//   extract: 'entities, keywords',
//   sentiment: 1, 
//   maxRetrieve: 1,
//   url: 'https://www.ibm.com/us-en'
// };

// alchemy_language.combined(params, function(err, res) {
//   if(err)
//     console.log('error', err)
//   else 
//     console.log(JSON.stringify(res, null, 2));
// });


// Alchemy Data News Code

// var params = {
//   start: 'now-1d',
//   end: 'now',
//   count: 10,
//   return: "enriched.url.title"
// };

// alchemy_data_news.getNews(params, function(err, res) {
//   if(err)
//     console.log(err)
//   console.log(JSON.stringify(res, null, 2))
// })







// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
