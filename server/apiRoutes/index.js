const router = require('express').Router()

router.use('/search', require('./search'))
router.use('/users', require('./users')) // matches all requests to /api/users/
router.use('/shows', require('./shows')) // matches all requests to  /api/shows/
router.use('/songs', require('./songs')) // matches all requests to  /api/songs/
router.use('/venues', require('./venues')) // matches all requests to  /api/venues/

//Handling 404s
router.use(function(req, res, next) {
  const err = new Error('Not found.')
  err.status = 404
  next(err)
})

module.exports = router
