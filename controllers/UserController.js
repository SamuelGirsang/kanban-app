'use strict'

const { User } = require('../models')
const { checkPassword } = require('../helpers/bcryptjs')
const { generateToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library')

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
    // console.log(email, password, "HIT");

    try {
      const userLogin = await User.findOne({ where : { email } })
      // console.log(userLogin);
      if (!userLogin) {
        throw { message : "Invalid email or password", statusCode : 400 }
      } else {
        
        if (checkPassword(password, userLogin.password)) {
          const access_token = generateToken(userLogin)
          // console.log(access_token);
          const name = userLogin.name
          const id = userLogin.id
          console.log(id);
          return res.status(200).json({ access_token, name, id })
        } else {
          throw { message : "Invalid email or password", statusCode : 400}
        }
      }
    } catch (err) {
      next (err)
    }
  }

  static googleLogin(req,res,next) {
    let payload = null
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
    // let email_google = ''
    // console.log(req.headers.id_token);
    // console.log(process.env.GOOGLE_CLIENT_ID);
    console.log('HIT');

    client.verifyIdToken({
      idToken: req.headers.id_token,
      audience: process.env.GOOGLE_CLIENT_ID
    })
    .then((ticket) => {
      payload = ticket.getPayload()
      console.log(payload.email);
      return User.findOne({ where : { email: payload.email } })
    })
    
    .then((user) => {
      if (user) {
        // console.log(user);
        console.log('User is already registered in the server')
        return user
      } else {
        console.log('Create new user!')
        console.log(payload, "ini payload controller");
        return User.create({
          username: payload.name,
          email: payload.email,
          password: 's4mu3l91rs4n6'
        })
      }
    })
    .then((user) => {
      // payload = { id: user._id, email: user.email }
      console.log(user);
      const access_token = generateToken(user)
      res.status(201).json({
        message: 'Successfully logged in', access_token
      })
    })
    .catch(next)
  }
}


module.exports = UserController