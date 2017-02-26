var mongoose = require('mongoose');
var Stock = require('./stock');
var Schema = mongoose.Schema;

var portfolioSchema = new Schema({
    stocks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stock'
    }]
}); 

var Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = Portfolio;