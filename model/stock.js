var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var stockSchema = new Schema({
    stockName: String,
    stockTicker: String
})

var Stock = mongoose.model('Stock', stockSchema)

module.exports = Stock;