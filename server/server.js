const express = require("express");
const path = require("path");
const passport = require("./authentication/passport");
const isAuth = require("./authentication/isAuth");

const session = require("express-session");
//import Routes
const proRoute = require("./routes/pro");
const driverRoute = require("./routes/driver");
const manifestRoute = require("./routes/manifest");
const trackRoute = require('./routes/track');
const searchRoute = require('./routes/search');

const port = process.env.PORT || 5000;
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//     res.header("Access-Control-Allow-Credentials", "true");
//     res.header('Access-Control-Allow-Methods', "GET,POST,OPTIONS,DELETE,PUT")
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

//     next();
//   });

app.use(
    session({
        secret: "jsltranslogi",
        saveUninitialized: true,
        resave: true
    })
);
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use(express.static(path.join(__dirname, "../client/build")));

app.post("/login", passport.authenticate("local"));

//Split the API routes
app.use('/search', searchRoute)
app.use('/trackMyShipment', trackRoute)
app.use("/driver", isAuth, driverRoute);
app.use("/pro", isAuth, proRoute);
app.use("/manifest", isAuth, manifestRoute);

//protected routes

app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(port, () => console.log(`Server start on port ${port}`));
