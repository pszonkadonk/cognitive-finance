var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var portfolioSchema = new Schema({
    stockName: String,
    stockTicker: String,
});

var Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = Portfolio;