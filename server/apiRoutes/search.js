'use strict'

var router = require('express').Router()
var request = require('request-promise')

router.post('/setlist', function(req, res, next){
  console.log('BODY REQ: ', req.body)
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

module.exports = router
