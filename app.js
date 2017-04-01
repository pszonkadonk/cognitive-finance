const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const configRoutes = require('./routes');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize());


// parse application/json
app.use(bodyParser.json())
//serve static file (index.html, images, css)
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));

// authentication
app.use(passport.initialize());


// view engine

const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');

const handlebarInstance = exphbs.create({
    defaultLayout: 'main',
    helpers: {
        asJSON: (obj, spacing) => {
            if(typeof spacing == 'number') 
                return new Handlebars.SafeString(JSON.stringify(obj, null, spacing))

            return new Handlebars.SafeString(JSON.stringify(obj));
        }
    }
});

app.engine('handlebars', handlebarInstance.engine);
app.set('view engine', 'handlebars');


//routes
configRoutes(app);



//authentication





const port = process.env.PORT || 3000

app.listen(port, function() {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});
