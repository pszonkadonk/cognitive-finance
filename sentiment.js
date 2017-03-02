const AlchemyLanguage = require('watson-developer-cloud/alchemy-language/v1');
const alchemyApiKey = {api_key: process.env.ALCHEMY_API_KEY || 'e159c11d8dda60a89823f4871028767ebecfe68b'}
const alchemy_language = new AlchemyLanguage(alchemyApiKey);
const request = require('request');
const Feedparser = require('feedparser');

function getSentiment(ticker, name) {
    let params = `http://finance.yahoo.com/rss/headline?s=${ticker}`; 
    // console.log(params);

    stockReq = request(params);
    let feedparser = new Feedparser([params])

    stockReq.on('error', (error) => {
        console.log(error)
    });

    stockReq.on('response', function(res) {
    var stream = this; // `this` is `req`, which is a stream
    if (res.statusCode !== 200) {
        this.emit('error', new Error('Bad status code'));
    }
    else {
        stream.pipe(feedparser);
    }
});

    feedparser.on('error', (error) => {
        console.log(error)
    });

    feedparser.on('readable', function() {
    // This is where the action is!
    let stream = this; // `this` is `feedparser`, which is a stream
    let meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance
    let item;

    while(item = stream.read()) {
        // console.log(item);
        sentiment = 0;
        numArticles = 0;
        averageSentiment = 0;

        params = {
            url: item.link,
            targets: [
                ticker,
                name
            ]
        };
        // console.log(typeof(ticker));
        alchemy_language.sentiment(params, (err, res) => {
            if(err) {
                console.log(err);
            }
            else {
                console.log(JSON.stringify(res, null, 2));
            }
            // if(!err && res !== null ) {
            //     console.log(res);
            //     res.results.forEach((element) => {
            //         console.log("ELEMENT");
            //         console.log(element);
            //         if(element.sentiment.score !== 'undefined'){
            //             sentiment += element.sentiment.score;
            //             numArticles += 1;
            //         // console.log(element.sentiment.score);
            //         // console.log(element.text);
            //     }
            //     if(numArticles == 5) {
            //         console.log("I reached 15 articles for " + element.stockName);
            //         return averageSentiment = sentiment / numArticles
            //     }
            // });

            // }
        });
     }
    });
}

    // while (item = stream.read()) {
    //     params = {
    //     url: item.link
    //     };
    //     alchemy_language.sentiment(params, (err, res) => {
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