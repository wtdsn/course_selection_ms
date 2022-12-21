const router = require('express').Router()
const { login, logout } = require('../controller/login')
router.use('/login', login)
router.use('/logout', logout)

module.exports = router