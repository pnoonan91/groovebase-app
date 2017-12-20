const router = require('express').Router()
const UserShows = require('../db/models/userShows.js')

//Get all setlists for a user
router.get('/:userId', function(req, res, next) {
  UserShows.findAll({
    where: {
      UserId: req.params.userId
    }
  })
  .then(result => res.send(result))
  .catch(next)
})

//Save a setlist to a user's setlists
router.post('/save', function(req, res, next) {
  UserShows.findOrCreate({
    where: {
      setlistId: req.body.setlistId,
      artistMbid: req.body.Mbid,
      venueId: req.body.venueId,
      UserId: req.body.UserId
    }
  })
  .then(result => res.send(result))
  .catch(next)
})

module.exports = router
