'use strict'

var router = require('express').Router()
var request = require('request-promise')

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

module.exports = router
