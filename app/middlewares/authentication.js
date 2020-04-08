const User = require('../models/User')
const authenticateUser = function (req, res, next) {
    const token = req.header('x-auth')
    User.findByToken(token)
        .then(user => {
            if (user) {
                // res.send(user)
                req.user = user
                req.token = token
                next()
            } else {
                res.status('401').send({ 'notice': 'token is not available' })
            }
        })
        .catch(err => {
            res.status('401').send(err)
        })

}
const authorizeUser = function(req,res,next){
    if(req.user.role == 'admin'){
        next()
    }else{
        res.status('404').json({
            notice : 'Page you are looking for does not exist'
        })
    }
}
const checkAllowAccess = function(req,res,next){
    if(req.user.allowAccess){
        next()
    }else{
        res.status('403').json({
            notice : 'Please confirm with admin'
        })
    }
}
module.exports = {
    authenticateUser,
    authorizeUser,
    checkAllowAccess
}