/*eslint-env node*/

//------------------------------------------------------------------------------
// Cognitive Finance IBM Watson Alchemy Application
//------------------------------------------------------------------------------

const express = require('express');

// Alchemy API and Key
const AlchemyLanguage = require('watson-developer-cloud/alchemy-language/v1');
const alchemyApiKey = {api_key: process.env.ALCHEMY_API_KEY || 'e159c11d8dda60a89823f4871028767ebecfe68b'}
const alchemy_language = new AlchemyLanguage(alchemyApiKey)

// cfenv provides access to your Cloud Foundry environment
const cfenv = require('cfenv');

const path = require('path');
const handlebars = require('handlebars');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const request = require('request');
const feedparser = require('feedparser-promised');
const async = require('async');
const fs = require('fs');
const Q = require('q');

// database and schemas
const mongoose = require('mongoose');
const Stock = require('./model/stock')




// create a new express server
const app = express();

//configure app
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'));
// get the app environment from Cloud Foundry
const appEnv = cfenv.getAppEnv();


// use middleware

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'bower_components')))
app.use(bodyParser());

// connect mongoose database

mongoose.connect('mongodb://localhost/myapp');
const db = mongoose.connection;


function myStockUpdate(id) {

  Stock.findById(id, function(err, stock) {
    if(err){ 
      console.log(err);
    }
    params = {
      url: "http://www.huffingtonpost.com/2010/06/22/iphone-4-review-the-worst_n_620714.html"
    };

    feed = getFeed(stock.stockTicker);

    articleLinks = feed.then(function(articles) {
      var linkArr = [];
      articles.forEach(function(article) {
        linkArr.push(articles.link);
      });
      return Promise.resolve(linkArr);
    });

    sentimentsArray = articleLinks.then(function(links){
      async.each(links, function(link, callback){
        multipleSentiments(link);
        callback(null);
      })
    })

    var sentiment = Q.denodeify(alchemy_language.sentiment.bind(alchemy_language));


    a = sentiment(params);

    b = a.then(function(returnVal) {
      console.log("This is b")
      console.log(returnVal);
      return Promise.resolve(returnVal.docSentiment.score);
    }).then(function(t) {
        stock.sentiment = parseFloat(t);
        stock.save(function(err, updatedStock){
        if(err) {
          console.log(err);
        }
        else {
          console.log("updated stock");
        }
      });
    });
  });
}

// myStockUpdate("58b9a69b871891324526069a");

function getFeed(ticker) {
  const options = {
    uri: `http://finance.yahoo.com/rss/headline?s=${ticker}`,
    timeout: 3000
  };
  return feedparser.parse(options)
}

function multipleSentiments(link) {
  var returnVal = 0;
  console.log("multipleSentiments got called");
  param = {
    url: link
  }

  alchemy_language.sentiment(param, function(err, response) {
    console.log(JSON.stringify(response, null, 2));

    // fs.appendFile("test.txt", JSON.stringify(response,null,2), function(err) {
    //   if(err){
    //     console.log(err);
    //   }
    //   else {
    //     console.log("wrote to file");
    //   }
    // });
  });  

}



foo = getFeed('IBM').then(function(returnedFeed) {
  var arr = []
  // console.log("From foo");
  returnedFeed.forEach(function(element) {
    arr.push(element.link);
    // console.log(element.summary);
  });
  return Promise.resolve(arr.slice(1,3));
});

baz = foo.then(function(theArray){
  console.log(theArray.length)
  // var sentiment = Q.denodeify(alchemy_language.sentiment.bind(alchemy_language));
  async.each(theArray, function(link, callback){
    a = multipleSentiments(link);
    callback(null);
  }), function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("God done processing");
    }
  }
});


// routes

app.get('/', function(req, res) {
  Stock.find({}, function(err, stocks) {
    var stockMap = {};
  

    stocks.forEach(function(stock){
      stockMap[stock._id] = stock;
    });
  console.log(stockMap);
    res.render(
      'index', {
        title: "Welcome",
        stocks: stockMap
    });
  });
});






// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', () => {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});