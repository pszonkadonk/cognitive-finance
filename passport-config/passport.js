const data = ("../data");
const userData = data.users;
const passport = require("passport");
const LocalStrategy = require("passport-local");

let exportedMethods = {
    authenticate() {
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
    }
};

module.exports = exportedMethods;