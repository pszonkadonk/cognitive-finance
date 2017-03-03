const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let stockSchema = new Schema({
    stockName: String,
    stockTicker: String,
    sentiment: {type: Number, default: 0}
});

let Stock = mongoose.model('Stock', stockSchema)

module.exports = Stock;