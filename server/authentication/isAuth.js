function isAuth(req,res,next) {
    
    console.log(req.isAuthenticated())
    if(req.isAuthenticated()){
        return next();
    } else {
        
         return res.status(400)
    }
}

module.exports = isAuth;