const express = require('express');
const path = require('path')
const passport = require('./authentication/passport')
const session = require('express-session')
const flash = require("connect-flash");

const isAuth = require('./authentication/isAuth')

//import Routes
const apiRoute = require('./routes/api');
const dashboardRoute = require('./routes/dashboard')

const port = process.env.PORT || 5000;
const app = express();

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(session({ secret: 'abc123' }))
//init passport
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
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