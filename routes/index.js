const userRoutes = require('./userRoutes');

const constructorMethod = (app) => {
    // app.use("/", (req,res) => {
    //     console.log("called");
    //     res.render('index');
    // });

    app.use("/user", userRoutes);
    
}

module.exports = constructorMethod;