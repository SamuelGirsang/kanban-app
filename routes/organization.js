'use strict'

const router = require('express').Router()
const OrganizationController = require('../controllers/OrganizationController')
const { authentication } = require('../middlewares/authentication')


router.use(authentication)

router.get('/', OrganizationController.readOrganization)
router.post('/', OrganizationController.createOrganization)
router.delete('/:org_id', OrganizationController.deleteOrganization)


module.exports = router