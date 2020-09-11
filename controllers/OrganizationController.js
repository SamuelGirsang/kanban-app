'use strict'

const { User, Task, Category, Organization } = require('../models')
const { response } = require('express')

class OrganizationController {
  static async readOrganization (req, res, next) {
    const readOrgs = await Organization.findAll()
    return res.status(200).json(readOrgs)
  }

  static async createOrganization (req, res, next) {
    
    const inputOrg = {
      organization_name : req.body.organization_name
    }
    // console.log(inputOrg);
    try {
      const newOrg = await Organization.create(inputOrg)
      if (!newOrg) {
        throw { message : msg }
      } else {
        return res.status(201).json(newOrg)
      }
    } catch (err) {
      next (err)
    }
  }

  static deleteOrganization (req, res, next) {
    const deleteOrganization = Organization.destroy({ where : { id : +req.params.org_id } })
    const deleteTask = Task.destroy({ where : { OrganizationId : +req.params.org_id } })


    Promise.all([
      deleteOrganization,
      deleteTask
    ])
    .then(response => {
      // console.log('HIT');
      res.status(200).json('Organization and all task inside organization has been successfully removed')
    })
    .catch((err) => {
      res.status(400).json( { message : 'Organization not found' }) 
    });
  }

}


module.exports = OrganizationController