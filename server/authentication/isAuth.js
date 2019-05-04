function isAuth(req,res,next) {
    
    console.log('Auth function')
    if(req.isAuthenticated()){
        return next();
    } else {
        
         return res.status(400).send('Forbidden')
    }
}

module.exports = isAuth;