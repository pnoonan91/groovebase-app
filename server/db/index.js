const Sequelize = require('sequelize')

console.log('Opening database connection.')

const db = new Sequelize('postgres://localhost:5432/grooveBase', {
  logging: false
})

module.exports = db
