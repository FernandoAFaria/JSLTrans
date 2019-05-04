const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    //Pull from DB to confirm username, password
    //for now, will hardcode
    
    if(username === 'admin' && password === 'admin') {
        return done(null, {id: 1, username: "admin"})
    } else {
        return done(null, false, {message: 'Incorrect username/password'})
    }
  }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(user, done) {
    
     return done( null, user);
    
  });

module.exports = passport;