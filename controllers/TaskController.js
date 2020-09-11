'use strict'

const { User, Task, Category, Organization } = require('../models')
const e = require('express')

class TaskController {
  static showTask (req, res, next) {
    Category.findAll({
      include :[{
        model : Task,
        where : {
          OrganizationId : +req.params.org_id
        }
      }]
    })
    .then(response => {
      res.status(200).json(response)
    })
    .catch(next)
  }

  static async createTask (req, res, next) {
    // console.log('HIT');
    // console.log(req.body, "REQ BODY");
    // console.log(req.params, "REQ PARAMS");
    
    const inputTask = {
      title: req.body.title,
      description: req.body.description,
      CategoryId: req.body.CategoryId,
      UserId: req.body.UserId,
      OrganizationId: +req.params.org_id
    }

    console.log(inputTask);
    try {
      const newTask = await Task.create(inputTask)
      // console.log(newTask);

      if (!newTask) {
        throw { message : msg }
      } else {
        return res.status(201).json(newTask)
      }
    } catch (err) {
      console.log(err);
      next (err)
    }
    // console.log(inputTask);
    // console.log(logila);
    // Task
    //   .create(inputTask)
    //   .then(response => {
    //     // console.log('HIT');
    //     res.status(200).json(response)
    //   })
    //   .catch(next)
  }

  static async readTaskById (req, res, next) {
    
    try {
      const showTaskById = await Task.findOne( { where : { id : +req.params.task_id }  })

      if (!showTaskById) {
        res.status(404).json({ message : `Task doesn't exist!`})
      } else {
        return res.status(200).json(showTaskById)
      }
        
    } catch (err) {
      console.log(err);
      next (err)
    }
  }

  static async updateTaskById (req, res, next) {
    // const { title, description } = req.body
    // console.log('HIT');
    // console.log(title, description);

    // console.log('HIT');
    const { title, description } = req.body
    const id  = +req.params.task_id
    try {
      const updateTask = await Task.update( 
        { title, description },
        { where : { id } }
        )
        if (!updateTask || !updateTask[0]) {
          throw { message : `Task doesn't exist!`, statusCode : 404 }
        } else {
          const showUpdatedTask = await Task.findByPk(id)
          return res.status(200).json(showUpdatedTask)
        }
    } catch (err) {
      next (err)
    }
  }

  static updateStatus(req, res, next) {
    Task.findOne({
      where: {
        id: +req.params.task_id
      }
    })
    .then(response => {
      const data = {
        CategoryId: response.CategoryId + 1
      }
      return Task.update(data, {
        where : { id : +req.params.task_id },
        returning : true
      })
    })
    .then(response => {
      res.status(200).json(response[1][0])
    })
    .catch(next)
  }

  static backStatus(req, rex, next) {
    Task.findOne({ where : { id : +req.params.task_id } })
    .then(response => {
      const data = {
        CategoryId : response.CategoryId - 1
      }
      return Task.update(data, {
        where : { id : +req.params.task_id },
        returning : true
      })
    })
  }

  static async deleteTaskById(req, res, next) {
    // console.log('HIT');
    try {
      const removeTask = await Task.destroy ({ where : { id : +req.params.task_id } })
      // console.log(removeTask);
      if (!removeTask) {
        throw { message : 'Task not found', statusCode : 404 }
      } else {
        return res.status(200).json('Task has been successfully removed')
      }
    } catch (err) {
      console.log(err);
      next (err)
    }
  }

  static async createCategory(req, res, next) {
    const { category_name } = req.body
  
    try {
      const newCategory = await Category.create({ category_name })

      if (!newCategory) {
        throw { message : msg }
      } else {
        return res.status(201).json(newCategory)
      }
    } catch (err) {
      console.log(err);
      next (err)
    }
  }


}


module.exports = TaskController