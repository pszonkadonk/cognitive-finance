/*eslint-env node*/

//------------------------------------------------------------------------------
// Cognitive Finance IBM Watson Alchemy Application
//------------------------------------------------------------------------------

var express = require('express');

// Alchemy API and Key
var AlchemyLanguage = require('watson-developer-cloud/alchemy-language/v1');
var alchemyApiKey = {api_key: process.env.ALCHEMY_API_KEY || 'e159c11d8dda60a89823f4871028767ebecfe68b'}
var alchemy_language = new AlchemyLanguage(alchemyApiKey)

// cfenv provides access to your Cloud Foundry environment
var cfenv = require('cfenv');
var path = require('path');
var handlebars = require('handlebars');
var hbs = require('hbs');
var bodyParser = require('body-parser');
var fs = require('fs');
var request = require('request');
var Feedparser = require('feedparser');

// database and schemas
var mongoose = require('mongoose');
var Portfolio = require('./model/portfolio');
var Stock = require('./model/stock')




// create a new express server
var app = express();

//configure app
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'));
// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();


// use middleware

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'bower_components')))
app.use(bodyParser());

// connect mongoose database

mongoose.connect('mongodb://localhost/myapp');
var db = mongoose.connection;

// var ibmStock = new Stock({
//   stockName: 'International Business Machines',
//   stockTicker: 'IBM'
// });

// var appleStock = new Stock({
//   stockName: 'Apple',
//   stockTicker: 'AAPL'
// });

// ibmStock.save(function(err, data){
//   if(err)
//     console.log(err);
//   else
//     console.log('Saved : ', data);
// });

// appleStock.save(function(err, data){
//   if(err)
//     console.log(err);
//   else
//     console.log('Saved : ', data);
// });

// var myPortfolio = new Portfolio({
//   stocks:[ibmStock, appleStock]
// });




// myPortfolio.save(function(err, data){
//   if(err)
//     console.log(err);
//   else
//     console.log('Saved : ', data);
// });


// routes


// todoItems = [
//   {id: 1, desc: "foo"},
//   {id: 2, desc: "bar"},
//   {id: 3, desc: "baz"},
// ]

function getPortfolio() {
  console.log("i got called");
  Portfolio.findOne({'_id': '58b1dfafca28a41130a27f3e'}, function(err,portfolio) {
    if(err)
      console.log(err)
    else {
      console.log("i got to else")
      console.log(portfolio.stocks);
     }
  })
}

app.get('/', function(req, res) {
  res.render('index', {
    title: 'My App',
    items: getPortfolio
  });
});

app.post('/add', function(req, res) {
  var newItem = req.body.newItem;
  todoItems.push({
    id: todoItems.length + 1,
    desc: newItem
  });
  res.redirect('/')
});



// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});






// Alchemy Code for Sentiment Analysis


// var params = 'http://finance.yahoo.com/rss/headline?s=IBM';

// stockReq = request(params);
// var feedparser = new Feedparser([params])

// stockReq.on('error', function (error) {
//   console.log(error)
// });

// stockReq.on('response', function (res) {
//   var stream = this; // `this` is `req`, which is a stream
//   if (res.statusCode !== 200) {
//     this.emit('error', new Error('Bad status code'));
//   }
//   else {
//     stream.pipe(feedparser);
//   }
// });

// feedparser.on('error', function (error) {
//   console.log(error)
// });

// feedparser.on('readable', function () {
//   // This is where the action is!
//   var stream = this; // `this` is `feedparser`, which is a stream
//   var meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance
//   var item;

//   while (item = stream.read()) {
//     params = {
//       url: item.link
//     };
//     alchemy_language.sentiment(params, function(err, res) {
//       if(err)
//         console.log('error', err)
//       else 
//         console.log(JSON.stringify(res, null, 2));
//     });
//   }
// });