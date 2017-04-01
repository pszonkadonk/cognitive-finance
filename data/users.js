const mongoCollections = require("../config/mongoCollections");
const userData = mongoCollections.users;
const uuid = require("uuid");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;





let exportedMethods = {
    
    getAllUsers() {
        return userData().then((userCollection) => {
            return userCollection.find({}).toArray();
        });
    },
    getUserById(id) {
        return userData().then((userCollection) => {
            return userCollection.findOne({ _id: id }).then((user) => {
                if(!user) {
                    throw("user could not be found");
                }
                return user
            });
        });
    },
    validateUser(email, password) {
        passport.use(new LocalStrategy(
            (email, password, done) => {
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
            }));
    },
    addUser(email, password) {
        return userData().then((userCollection) => {
            let newUser = {
                _id: uuid.v4(),
                email: email,
                password: password
            }
            return userCollection.insertOne(newUser).then((newInsertedInformation) => {
                return newInsertedInformation.insertedId;
            }).then((newId) => {
                return this.getUserById(newId);
            })
        });
    },
    removeUser(id) {
        return users().then((userCollection) => {
            return userCollection.removeOne({_id: id}).then((deletedUser) => {
                if(deletedUser.deletedCount === 0) {
                    throw(`could not delete user with id ${id}`);
                }
            })
        });
    },
    updateUser(id, updatedUser) {
        return this.getUserById(id).then((currentUser)=> {
            let updateUser = {
                email: updatedUser.email,
                password: updatedUser.password
            };

            let updateCommand = {
                $set: updateUser
            };
            return userCollection.updateOne({_id: id}, updateCommand).then(() => {
                return this.getUserById(id);
            });
        });
    }
}

module.exports = exportedMethods;