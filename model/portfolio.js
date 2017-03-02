const mongoose = require('mongoose');
const Stock = require('./stock');
const Schema = mongoose.Schema;

let portfolioSchema = new Schema({
    stocks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stock'
    }]
}); 

let Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = Portfolio;