let express = require('express')
let router = express.Router()
const conn = require('./../mongo-init')

router.get('/', (req, res, next) => {
  'use strict'
  res.render('register', {title: 'Register'})
})

router.post('/', (req, res, next) => {
  'use strict'
  if (conn !== null) {
    let students = conn.database.collection('students')
    students.save(req.body, (err, result) => {
      if (err) return console.log(err)
      console.log('saved to database')
      res.redirect('/users')
    })
  }
})

module.exports = router
