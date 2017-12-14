const router = require('express').Router()
const User = require('../db/models/users')

//sign-up
router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      req.login(user, err => {
        if (err) next(err)
        else res.json(user)
      })
    })
    .catch(next)
})

//log-in
router.post('/login', (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then((user) => {
      if (!user) {
        res.status(401).send('User not found')
      }
      else if (!user.correctPassword(req.body.password)) {
        res.status(401).send('Incorrect password')
      }
      else {
        req.login(user, err => {
          if (err) next(err)
          else res.json(user)
        })
      }
    })
    .catch(next)
})

//log-out
router.post('/logout', function(req, res, next) {
  req.logout()
  res.sendStatus(200)
})

//get-user
router.get('/me', function(req, res, next) {
  res.json(req.user)
})

module.exports = router
