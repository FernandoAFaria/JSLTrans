function isAuth(req,res,next) {

    if(req.isAuthenticated()){
        return next();
    } else {
        
         return res.status(401).send('Forbidden')
    }
}

module.exports = isAuth;