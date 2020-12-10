require('dotenv-safe').config()
const express = require('express')
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser')
const morgan = require('morgan')
const compression = require('compression')
var useragent = require('express-useragent');
const helmet = require('helmet')
const cors = require('cors')
const passport = require('passport')
const app = express()
const i18n = require('i18n')
const initMongo = require('./config/mongo')
const path = require('path')

// Setup express server port from ENV, default: 3000
app.set('port', process.env.PORT || 3000)
app.set('case sensitive routing', true);
// Enable only in development HTTP request logger middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Redis cache enabled by env variable
if (process.env.USE_REDIS === 'true') {
  const getExpeditiousCache = require('express-expeditious')
  const cache = getExpeditiousCache({
    namespace: 'expresscache',
    defaultTtl: '1 minute',
    engine: require('expeditious-engine-redis')({
      redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
      }
    })
  })
  app.use(cache)
}

// for parsing json
app.use(
  bodyParser.json({
    limit: '20mb'
  })
)
// for parsing application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    limit: '20mb',
    extended: true
  })
)

app.use(fileUpload({
  createParentPath: true
}));


// i18n
i18n.configure({
  locales: ['en', 'es'],
  directory: `${__dirname}/locales`,
  defaultLocale: 'en',
  objectNotation: true
})
app.use(i18n.init)
app.use(useragent.express());
// Init all other stuff
var whitelist = ['http://localhost:4200']
var corsOptionsDelegate =  function (req, callback) {
  //ip eklenebilir
    if ((!req.useragent["browser"] && !req.useragent["isDesktop"] && req.useragent["isMobile"]) || (whitelist.indexOf(req.header('Origin')) !== -1))
    {
      return callback(null, true)
    }
    else {
      //throw '{"error":"ServerError","message":"Not allowed by Web Service"}';
      //callback('{"error":"ServerError","message":"Not allowed by Web Service"}');
      //callback(new Error('Not allowed by Web Service'))
      return callback(null, true) // for without cors
    }
  }

app.use(cors(corsOptionsDelegate))

app.use(passport.initialize())
app.use(compression())
app.use(helmet())
app.use(require('./app/routes'))
app.listen(app.get('port'))

// Init MongoDB
initMongo()

module.exports = app // for testing