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
var request = require('request');
var Feedparser = require('feedparser');
var sentiment = require('./sentiment');

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


// populate database with a portfolio with stocks


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
// }).then(function() {
//   appleStock.save(function(err, data){
//   if(err)
//     console.log(err);
//   else
//     console.log('Saved : ', data);
//   })
// }).then(function() {
//   var myPortfolio = new Portfolio({
//   stocks: [ibmStock, appleStock]
//   })
//   myPortfolio.save(function(err, data){
//       if(err)
//         console.log(err);
//       else {
//         console.log("this is portfolio: ");
//         console.log(myPortfolio);
//         console.log('Saved : ', data);
//       }
//   }); 
// });




//get portfolio

function getStockPortfolio(id) {
  var portfolioPromise = Portfolio.findById({'_id': id}).populate('stocks').exec(function(err, stocks) {
  });
  return portfolioPromise;
} 

foo = getStockPortfolio("58b723c445014b17633932b2").then(function(val) {
  b = val.stocks;
  b.forEach(function(part, index, arr){
    bar = Stock.findById({"_id": part._id}).lean().exec(function(err, stock) {
      return JSON.stringify(stock);
    }).then(function(p){
      p.sentiment = 1;
      console.log(p)
    });
  });
});
// routes

app.get('/', function(req, res) {
  getStockPortfolio('58b723c445014b17633932b2').then(function(port){
    sentimentArray = [1,2];

    foo = port.stocks


    // sentimentArray = [
    //   {
    //   a: "hello",
    //   b: "goodbye"
    // },
    // {
    //   a: "buenos",
    //   b: "dias"
    // }
    // ];
    // portfolio.stocks.forEach(function(stock) {
    //   sentimentArray.push(sentiment.getSentiment(stock.stockTicker,stock.stockName));
    // });

    console.log(sentimentArray);
    
      res.render('index', {
        title: 'My App',
        stocks: port.stocks,
        sentiment: sentimentArray
      });
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

