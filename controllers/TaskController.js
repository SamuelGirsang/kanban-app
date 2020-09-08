'use strict'

const { User, Task, Category, 
  Organization, Project, Role } = require('../models')


class TaskController {
  static showTask (req, res) {
    console.log(req.userData);
    Task.findAll({
      include: [Category, Project],
      where : {
        ProjectId : 2
      }      
    })
    .then(Tasks => {
      Organization.findAll({
        
        where : {
          Organization : 2
        }
      })
      console.log(Tasks);
      res.status(200).json(Tasks)
    })
    // .then()
    .catch((err) => res.status(500).json(err))
  }


}


module.exports = TaskController