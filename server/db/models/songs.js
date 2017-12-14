'use strict'

const db=require('../index')
const Sequelize = require('sequelize')

var Songs = db.define('Songs', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Songs
