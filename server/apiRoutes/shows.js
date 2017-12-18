const router = require('express').Router()
const UserShows = require('../db/models/userShows.js')

//Save a setlist to a user's setlists
router.post('/save', function(req, res, next) {
  console.log(req.body)
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
