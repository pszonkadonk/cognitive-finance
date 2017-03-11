const express = require("express");
const app = express();
const cfenv = require("cfenv");
const bodyParser = require('body-parser')
const watson = require("watson-developer-cloud");
const vcapServices  = require("vcap_services");



var TradeoffAnalyticsV1 = require('watson-developer-cloud/tradeoff-analytics/v1');
var tradeoff_analytics = new TradeoffAnalyticsV1({
  username: '89002305-ec10-4eb3-ace3-ea1538f73ffb',
  password: '1YjfEmCit4Cm'
});



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
//serve static file (index.html, images, css)
app.use(express.static(__dirname + '/views'));








// tradeoff_analytics.dilemmas(params,(err, resolution) => {
//   if(err) {
//     console.log(err);
//   }
//   else {
//     console.log(JSON.stringify(resolution, null, 2));
//   }
// })


// console.log(JSON.stringify(params, null, 2));


app.get('/', (req, res) => {
  response.send("hello");
  return;
});




const port = process.env.PORT || 3000

app.listen(port, function() {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});
