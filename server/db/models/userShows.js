'use strict'

const db=require('../index')
const crypto = require('crypto')
const _ = require('lodash')
const Sequelize = require('sequelize')

var UsersShows = db.define('UsersShows', {
  setlistId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  artistMbid: {
    type: Sequelize.STRING,
    allowNull: false
  },
  venueId: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = UsersShows
