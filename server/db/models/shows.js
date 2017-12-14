'use strict'

const db=require('../index')
const Sequelize = require('sequelize')

var Shows = db.define('Shows', {
  date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  showName: {
    type: Sequelize.STRING
  }
})

module.exports = Shows
