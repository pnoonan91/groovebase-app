'use strict'

const {db} = require('./server/db/models')
const app = require('./server')
const PORT = 3000

db.sync() // if you update your db schemas, make sure you drop the tables first and then recreate them
.then(() => {
  console.log('Database is up and running!')
  app.listen(PORT, (err) => {
    if (err) throw err
    console.log(`Server is running and listening on port ${PORT}`)
  })
})
.catch(console.error)
