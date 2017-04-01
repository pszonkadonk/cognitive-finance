const express = require('express');
const router = express.Router();
const data = require("../data");
const users = data.users;
const passport = require("passport");
const LocalStrategy = require("passport-local");

passport.use(new LocalStrategy((email, password, done) => {
    return userData().then((userCollection) => {
        userCollection.findOne({ email:email }, (err, user) => {
            if (err) { return done(err); }

            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }

            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    });
}))

router.get("/login", (req, res) => {
    res.render('user/user_login');
})

router.post('/login', passport.authenticate('local',
    { successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true 
    }));

router.post("/signup", (req, res) => {
    let email = req.body.userEmail;
    let password = req.body.userPassword;

    let newUser = users.addUser(email, password);
});


module.exports = router;