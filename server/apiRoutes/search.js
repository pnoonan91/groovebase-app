'use strict'

var router = require('express').Router()
var request = require('request-promise')
var UserShows = require('../db/models/userShows.js')
var Sequelize = require('Sequelize')

router.post('/setlist', function(req, res, next){
  var results

  var options = { method: 'GET',
  url: 'https://api.setlist.fm/rest/1.0/search/setlists',
  qs: req.body,
  headers:
   { 'postman-token': 'a7fc1564-6ce9-41a9-6dad-3268bd115b62',
     'cache-control': 'no-cache',
     'x-api-key': 'c5653fc6-cf2a-4988-a6d8-301648012d9c',
     accept: 'application/json' }
  }

  request(options, function(error, response, body) {
    if (error) throw new Error(error)
    results=body
  })
    .then(() => res.json(results))

})

router.post('/setlist/single', function(req, res, next) {
  var setlistId = req.body.setlist
  var setlist
  var search = `https://api.setlist.fm/rest/1.0/setlist/${setlistId}`

  var options = { method: 'GET',
  url: search,
  headers:
   { 'postman-token': 'e15c685b-040d-8530-4bc0-059bcbdf8ca0',
     'cache-control': 'no-cache',
     'x-api-key': 'c5653fc6-cf2a-4988-a6d8-301648012d9c',
     accept: 'application/json' }
  }

  request(options, function(error, response, body) {
    if (error) throw new Error(error)

    setlist=body
  })
    .then(() => res.json(setlist))

})

router.post('/artistname', function(req, res, next) {
  var artistMbid = req.body.artistMbid
  var artistName

  var options = { method: 'GET',
  url: `https://api.setlist.fm/rest/1.0/artist/${artistMbid}`,
  headers:
   { 'postman-token': '43d99c1e-5ed1-eec1-efdf-d107d5278c89',
     'cache-control': 'no-cache',
     'x-api-key': 'c5653fc6-cf2a-4988-a6d8-301648012d9c',
     accept: 'application/json' }
  }

request(options, function (error, response, body) {
  if (error) throw new Error(error)

  artistName = body
})
  .then(() => {
    console.log(artistName)
    res.json(artistName)
  })

})

router.get('/stats/:userId', function(req, res, next) {
  let results = {
    userShows: {}
  }

  UserShows.findAndCountAll({
    where: {
      UserId: req.params.userId
    }
  })
  .then(shows => results['userShows'] = shows)
  .then(() => res.json(results))

})

router.get('/singleartist/:artistMbid', function(req, res, next) {
  UserShows.findOne({
    where: {
      artistMbid: req.params.artistMbid
    }
  })
  .then(artist => res.json(artist))
  .catch(next)
})

router.post('/topalbums', function(req, res, next) {
  var artistMbid = req.body.artistMbid
  var topAlbums

  var options = { method: 'GET',
  url: 'http://ws.audioscrobbler.com/2.0/',
  qs:
   { method: 'artist.gettopalbums',
     mbid: artistMbid,
     api_key: 'b18cd2a3fdc3df127d4e9e87cf4b1fc0',
     format: 'json' },
  headers:
   { 'postman-token': 'e6a2fa51-e322-cf97-d0d8-9056d33ea27f',
     'cache-control': 'no-cache',
     'x-api-key': 'c5653fc6-cf2a-4988-a6d8-301648012d9c',
     accept: 'application/json' }
  }

request(options, function (error, response, body) {
  if (error) throw new Error(error)

  topAlbums = body
})
.then(() => {
  res.json(topAlbums)
})

})

router.get('/singlevenue/:venueId', function(req, res, next) {
  UserShows.findOne({
    where: {
      venueId: req.params.venueId
    }
  })
  .then(venue => res.json(venue))
  .catch(next)
})

router.get('/tourdates/:artistName', function(req, res, next) {

  var tourDates

  var options = { method: 'GET',
  url: `https://rest.bandsintown.com/artists/${req.params.artistName}/events`,
  qs: { app_id: 'grooveBase' },
  headers:
   { 'postman-token': 'f157689a-86de-d84d-ac5e-7f1774a1ee6f',
     'cache-control': 'no-cache',
     accept: 'application/json' }
  }

request(options, function (error, response, body) {
  if (error) throw new Error(error)

  tourDates = body
})
.then(() => {
  res.json(tourDates)
})

})

module.exports = router
