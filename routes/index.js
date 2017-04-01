const userRoutes = require('./userRoutes');

const constructorMethod = (app) => {


    app.use("/user", userRoutes);
    

    app.use("*", (req,res) => {
        res.render("welcome/welcome");
    });

    
}

module.exports = constructorMethod;