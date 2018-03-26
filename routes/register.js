let express = require('express')
let router = express.Router()
const pouchdb = require('./../mongo-init')

// Render Register Page
router.get('/', (req, res, next) => {
  'use strict'
  res.render('register', {title: 'Register'})
})

// Process Registration details
router.post('/', (req, res, next) => {
  'use strict'
  let students = pouchdb.db
  students.post(
    req.body
  ).then((result) => {
    console.log(req.body)
    console.log('saved to database')
    res.redirect('/users')
  }).catch((err) => {
    return console.log(err)
  })
})

module.exports = router
