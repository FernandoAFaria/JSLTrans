const express = require('express')
const passport = require('../authentication/passport');

const router = express.Router();

router.post("/",passport.authenticate('local'), (req, res)=> {
  console.log(req.isAuthenticated())
  req.logIn(req.user, function (err) {
    if (err) {
        return next(err);
    }
    return res.status(200).send('Logged In') // send whatever you want or redirect
});
  



})


module.exports = router;