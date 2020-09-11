'use strict'

const router = require('express').Router()
const TaskController = require('../controllers/TaskController')
const { authentication } = require('../middlewares/authentication')



router.use(authentication)
router.post('/', TaskController.createCategory)

module.exports = router