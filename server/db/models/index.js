'use strict'
const db = require('../index')

//MODELS
const Shows = require('./shows')
const Artists = require('./artists')
const Songs = require('./songs')
const Venues = require('./venues')
const Users = require('./users')

//ASSOCIATIONS
Shows.belongsTo(Venues)
Shows.hasOne(Artists)
Shows.hasMany(Songs)
Shows.hasMany(Users)

module.exports = {
  db,
  Shows,
  Artists,
  Songs,
  Venues,
  Users
}
