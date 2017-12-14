const router = require('express').Router()
const meRouter = require('./me')

router.use('/me', meRouter)

module.exports = router
