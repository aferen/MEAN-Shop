require('./passport')
const passport = require('passport')
const utils = require('../app/middleware/utils')

module.exports = function (req, res, next) {
    passport.authenticate('jwt', { session: false }, function(err, user, info) {
        if (err || info || !user) {
            if (info.name === "TokenExpiredError") {
                return res.status(401).json(utils.buildErrObject(401, info.name));
            }
            return res.status(401).json(utils.buildErrObject(401, info.message));
        }
        else {
            req.user = user; 
            next()
        }
 
    })(req, res, next);
}