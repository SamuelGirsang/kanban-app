'use strict'

const router = require('express').Router()
const TaskController = require('../controllers/TaskController')
const { authentication } = require('../middlewares/authentication')


router.use(authentication)
router.get('/', TaskController.showTask)


module.exports = router