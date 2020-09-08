'use strict'

const { User } = require('../models')
const { checkPassword } = require('../helpers/bcryptjs')
const { generateToken } = require('../helpers/jwt')

class UserController {

  static async register (req, res, next) {
    const { name, email, password } = req.body

    try {
      const newUser = await User.create({ name, email, password })
      return res.status(201).json({ name, email})
    } catch (err) {
      next (err)
    }
  }

  static async login (req, res, next) {
    const { email, password } = req.body

    try {
      const userLogin = await User.findOne({ where : { email } })
      if (!userLogin) {
        throw { message : "Invalid email or password", statusCode : 400 }
      } else {
        if (checkPassword(password, userLogin.password)) {
          const access_token = generateToken(userLogin)
          return res.status(200).json({ access_token })
        } else {
          throw { message : "Invalid email or password", statusCode : 400}
        }
      }
    } catch (err) {
      next (err)
    }
  }
}


module.exports = UserController