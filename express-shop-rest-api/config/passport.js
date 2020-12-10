const passport = require('passport')
const User = require('../app/models/user')
const auth = require('../app/middleware/auth')
const JwtStrategy = require('passport-jwt').Strategy

/**
 * Extracts token from: header, body or query
 * @param {Object} req - request object
 * @returns {string} token - decrypted token
 */


const jwtExtractor = (req) => {
  let token = null
  if (req.headers.authorization) {
    token = req.headers.authorization.replace('Bearer ', '').trim()
  } else if (req.body.token) {
    token = req.body.token.trim()
  } else if (req.query.token) {
    token = req.query.token.trim()
  }
  if (token && req.originalUrl !== "/token") {
    // Decrypts token
    jwtOptions.secretOrKey = process.env.ACCESS_TOKEN_SECRET;
    token = auth.access_token_decrypt(token)
  }
  else if (req.originalUrl === "/token") {
      jwtOptions.secretOrKey = process.env.REFRESH_TOKEN_SECRET;
      token = auth.refresh_token_decrypt(token)
  }   
  return token
}


const jwtOptions = {
  secretOrKey: process.env.ACCESS_TOKEN_SECRET,
  jwtFromRequest: jwtExtractor,
  issuer : "accounts.examplesoft.com",
  audience : "yoursite.net"
}


/**
 * Login with JWT middleware
 */
 
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload.data._id, (err, user) => {
    if (err) {
      return done(err, false)
    } 
    return !user ? done(null, false) : done(null, user)
  })
})

passport.use(jwtLogin)
