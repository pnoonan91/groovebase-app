'use strict'

var router = require('express').Router()

var User = require('../db/models/users.js')

router.param('id', function(req, res, next, id) {
  User.findById(id)
  .then(function(user) {
    if (!user) throw Error('No user found')
    req.requestedUser = user
    next()
    return null
  })
  .catch(next)
})

router.get('/', function(req, res, next) {
  User.findAll({})
  .then(function(users) {
    res.json(users)
  })
  .catch(next)
})

router.post('/', function(req, res, next) {
  User.create(req.body)
  .then(function(user) {
    res.status(201).json(user)
  })
  .catch(next)
})

router.get('/:id', function(req, res, next) {
  req.requestedUser.reload(User.options.scopes.populated())
  .then(function(requestedUser) {
    res.json(requestedUser)
  })
  .catch(next)
})

router.put('/:id', function(req, res, next) {
  req.requestedUser.update(req.body)
  .then(function(user) {
    res.json(user)
  })
  .catch(next)
})

router.delete('/:id', function(req, res, next) {
  req.requestedUser.destroy()
  .then(function() {
    res.status(204).end()
  })
  .catch(next)
})

module.exports = router
