'use strict'

const router = require('express').Router()
const TaskController = require('../controllers/TaskController')
const { authentication } = require('../middlewares/authentication')
const { authorizationTask } = require('../middlewares/authorization')


router.use(authentication)
router.get('/:org_id', TaskController.showTask)
router.post('/:org_id', TaskController.createTask)


router.get('/org/:task_id', authorizationTask, TaskController.readTaskById)
router.put('/org/:task_id', authorizationTask, TaskController.updateTaskById)
router.put('/org/:task_id', authorizationTask, TaskController.updateStatus)
router.put('/org/:task_id', authorizationTask, TaskController.backStatus)
router.delete('/org/:task_id', authorizationTask, TaskController.deleteTaskById)




module.exports = router