'use strict'

const db=require('../index')
const Sequelize = require('sequelize')

var Artists = db.define('Artists', {
  name: {
    type: Sequelize.TEXT
  }
})

module.exports = Artists
