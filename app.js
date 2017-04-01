const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const configRoutes = require('./routes');
const ejs = require('ejs');



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(router);

// parse application/json
app.use(bodyParser.json())
//serve static file (index.html, images, css)
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));

// view engine

app.set('view engine', 'ejs')

configRoutes(app);

// router.get('/', (req, res) => {
//   res.render('index');
// });

// router.get('/user', (req, res) => {
//   res.render('user_login');
// });


const port = process.env.PORT || 3000

app.listen(port, function() {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});
