function isAuth(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash('error_msg', "Please log in.");
         res.redirect('/login')
    }
}

module.exports = isAuth;