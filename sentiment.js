const AlchemyLanguage = require('watson-developer-cloud/alchemy-language/v1');
const alchemyApiKey = {api_key: process.env.ALCHEMY_API_KEY || 'e159c11d8dda60a89823f4871028767ebecfe68b'}
const alchemy_language = new AlchemyLanguage(alchemyApiKey)

const Stock = require('./models/Stock');

function getSentiment(id) {
    let params = {
    url: "https://www.nytimes.com/2017/03/03/opinion/paul-ryans-misguided-sense-of-freedom.html?ref=opinion" 
    }  
 
     alchemy_language.sentiment(params, function(err, alchemyResponse) {
        if(err) {
            console.log(err);
        }
        else {
            Stock.findByIdAndUpdate(id,
             { sentiment: alchemyResponse.docSentiment.score }, {new: true}).exec((err,stock) => {
                if(err) {
                     console.log(err)
                 }
                 else {
                     console.log("Updated stock");
                     console.log(JSON.stringify(stock, null, 2));
                 }
             });
        }
    });
}

module.exports = {
    getSentiment: getSentiment
}