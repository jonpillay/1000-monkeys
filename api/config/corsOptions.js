const allowedOrigins = require('./allowedOrigins')

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || (process.env.NODE_ENV !== 'production' && (!origin || process.env.LOCAL_HOST_URL) )) {
      callback(null,true)
    } else {
      callback(new Error('Blocked By CORS'))
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}

module.exports = corsOptions