'use strict'

const { Task } = require('../models')

const authorizationTask = async (req, res, next) => {

  // console.log('HIT');
  // console.log(req.params.task_id);

  Task.findByPk(req.params.task_id)
    
    .then(response => {
      // console.log(response, "RESPONSE");
      // console.log(req);
      if (response != null) {
        if (response.UserId == req.userData.id) {
          next ()
        } else {
          console.log(err);
        }
      } else {
        console.log(err);
      }
    })
    .catch(next)
}


module.exports = { authorizationTask }