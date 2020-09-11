'use strict'

const router = require('express').Router()
const userRouter = require('./user')
const taskRouter = require('./task')
const organizationRouter = require('./organization')
const categoryRouter = require('./category')

router.use('/', userRouter)
router.use('/tasks', taskRouter)
router.use('/organizations', organizationRouter)
router.use('/categories', categoryRouter)


module.exports = router