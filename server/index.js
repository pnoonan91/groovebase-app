const express = require('express')
const app = express()
const morgan = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const db = require('./db')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const passport = require('passport')
const dbStore = new SequelizeStore({ db: db })
const User = require('./db/models/users')

// sync so that our session table gets created
dbStore.sync()

/* ---------- LOGGING MIDDLEWARE ---------- */
app.use(morgan('dev'))

/* ---------- BODY-PARSING MIDDLEWARE ---------- */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

/* ---------- SESSION MIDDLEWARE ---------- */
app.use(session({
  secret: process.env.SESSION_SECRET || 'reese dog',
  store: dbStore,
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())

app.use(passport.session())

/* ---------- SERIALIZE/DESERIALIZE USER ---------- */
passport.serializeUser((user, done) => {
  try {
    done(null, user.id)
  } catch (err) {
    done(err)
  }
})

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(done)
})

/* ---------- PUBLIC MIDDLEWARE ---------- */
app.use(express.static(path.join(__dirname, '../public')))

/* ---------- ROUTING ---------- */
app.use('/api', require('./apiRoutes'))
app.use('/auth', require('./auth'))

/* ---------- DEFAULT FRONT END ROUTE ---------- */
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

/* ---------- ERROR HANDLING MIDDLEWARE ---------- */
app.use(function(err, req, res, next) {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})

module.exports = app
