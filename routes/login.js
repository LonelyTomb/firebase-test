const express = require('express')
const router = express.Router()
const mongodb = require('./../mongo-init')
const session = require('express-session')

// Render Login Page
router.get('/', (req, res) => {
  'use strict'
  res.render('login', {title: 'Login', message: ''})
})

// Process login details
router.post('/', (req, res) => {
  'use strict'
  mongodb.database.collection('admins').findOne({
    username: req.body.username,
    password: req.body.password
  }, (err, result) => {
    if (err) console.log(err)
    if (result) {
      req.session._id = result._id
      req.session.username = result.username
      res.redirect('/edit')
    } else {
      res.render('login', {title: 'Login', message: 'Invalid Login Details'})
      console.log('unable to login')
    }
  })
})
module.exports = router
