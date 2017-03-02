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
const Feedparser = require('feedparser');
const sentiment = require('./sentiment');

// database and schemas
const mongoose = require('mongoose');
const Portfolio = require('./model/portfolio');
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


// populate database with a portfolio with stocks


// let ibmStock = new Stock({
//   stockName: 'International Business Machines',
//   stockTicker: 'IBM'
// });

// let appleStock = new Stock({
//   stockName: 'Apple',
//   stockTicker: 'AAPL'
// });

// ibmStock.save((err, data) => {
//   if(err)
//     console.log(err);
//   else
//     console.log('Saved : ', data);
// }).then(() => {
//   appleStock.save((err, data) => {
//   if(err)
//     console.log(err);
//   else
//     console.log('Saved : ', data);
//   })
// }).then(() => {
//   let myPortfolio = new Portfolio({
//   stocks: [ibmStock, appleStock]
//   })
//   myPortfolio.save((err, data) =>{
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
  let portfolioPromise = Portfolio.findById({'_id': id}).populate('stocks').exec((err, stocks) => {
  });
  return portfolioPromise;
} 

// foo = getStockPortfolio("58b723c445014b17633932b2").then((portfolio) =>{
//   myArray = []
//   portfolio.stocks.forEach((element) => {
//     // console.log(element)
//     element = element.toObject();
//     element.sentiment = 1;
//     // console.log(element);
//     myArray.push(element);
//   });
//  return(myArray);
// })

// foo = getStockPortfolio("58b723c445014b17633932b2").then((val) => {
//   b = val.stocks;
//   b.forEach((part, index, arr) =>{
//     bar = Stock.findById({"_id": part._id}).lean().exec((err, stock) => {
//       return JSON.stringify(stock);
//     }).then((p) =>{
//       p.sentiment = 1;
//       console.log(p)    // this will allow mongoose objects to be altered.
//     });
//   });
// });



  
  


// routes

app.get('/', (req, res) => {
  getStockPortfolio('58b723c445014b17633932b2').then((port) =>{  
    myArray = []; 
    port.stocks.forEach((element) => {
    // console.log(element)
    element = element.toObject();
    // console.log(element.stockTicker);
    // console.log(element.stockName);
    element.sentiment = sentiment.getSentiment(element.stockTicker, element.stockName);
    // console.log(element.sentiment);
    myArray.push(element);
  });
    res.render('index', {
      title: 'My App',
      stocks: myArray
    });
  });
});

app.post('/add', (req, res) => {
  let newItem = req.body.newItem;
  todoItems.push({
    id: todoItems.length + 1,
    desc: newItem
  });
  res.redirect('/')
});



// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', () => {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});






// Alchemy Code for Sentiment Analysis