const express = require('express');
const path = require('path')
const passport = require('./authentication/passport')


//import Routes
const apiRoute = require('./routes/api');


const port = process.env.PORT || 5000;
const app = express();

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', "GET,POST,OPTIONS,DELETE,PUT")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//routes
app.use(express.static(path.join(__dirname, '../client/build')))
app.use('/login/submit', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
}));
app.use('/api', apiRoute)

//protected routes



app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
})





app.listen(port, () => console.log(`Server start on port ${port}`))