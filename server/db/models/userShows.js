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
  artistName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  venueId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  venueName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  stateCode: {
    type: Sequelize.STRING,
    allowNull: false
  },
  eventDate: {
    type: Sequelize.STRING,
    allowNull: false
  },
  favorite: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
},
  { getterMethods: {
      isFavorite() {
        if(this.favorite === true){
          return "/favorite-icons/favorite.png"
        }
        else{
          return "/favorite-icons/not-favorite.png"
        }
      }
    }
})

module.exports = UsersShows
