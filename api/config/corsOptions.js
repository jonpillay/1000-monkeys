const allowedOrigins = require('./allowedOrigins')

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      callback(null,true)
    } else {
      callback(new Error('Blocked By CORS'))
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}

module.exports = corsOptions