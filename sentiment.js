var AlchemyLanguage = require('watson-developer-cloud/alchemy-language/v1');
var alchemyApiKey = {api_key: process.env.ALCHEMY_API_KEY || 'e159c11d8dda60a89823f4871028767ebecfe68b'}
var alchemy_language = new AlchemyLanguage(alchemyApiKey);
var request = require('request');
var Feedparser = require('feedparser');

function getSentiment(ticker, name) {
    var params = `http://finance.yahoo.com/rss/headline?s=${ticker}`; 
    console.log(params);

    stockReq = request(params);
    var feedparser = new Feedparser([params])

    stockReq.on('error', function (error) {
        console.log(error)
    });

    stockReq.on('response', function (res) {
    var stream = this; // `this` is `req`, which is a stream
    if (res.statusCode !== 200) {
        this.emit('error', new Error('Bad status code'));
    }
    else {
        stream.pipe(feedparser);
    }
});

    feedparser.on('error', function (error) {
        console.log(error)
    });

    feedparser.on('readable', function () {
    // This is where the action is!
    var stream = this; // `this` is `feedparser`, which is a stream
    var meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance
    var item;

    while(item = stream.read()) {
        // console.log(item);
        sentiment = 0;
        numArticles = 0
        params = {
            url: item.link,
            targets: [
                ticker,
                name
            ]
        };
        alchemy_language.sentiment(params, function(err, res) {
            if(!err && res != null) {
                res.results.forEach(function(element) {
                    if(element.sentiment.score !== 'undefined')
                        sentiment += element.sentiment.score;
                        numArticles += 1;
                    // console.log(element.url)
                    console.log(element.sentiment.score);
                    console.log(element.text);
                });
                if(numArticles != 0) {
                    averageSentiment = sentiment / numArticles
                }
            }
            return averageSentiment;
        });
    }
    });
}

    // while (item = stream.read()) {
    //     params = {
    //     url: item.link
    //     };
    //     alchemy_language.sentiment(params, function(err, res) {
    //     if(err)
    //         console.log('error', err)
    //     else 
    //         console.log(JSON.stringify(res, null, 2));
    //         });
    //     }
    // });


module.exports = {
    getSentiment: getSentiment
};