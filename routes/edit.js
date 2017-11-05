const express = require('express')
const router = express.Router()
const session = require('express-session')
const mongodb = require('./../mongo-init')

router.get('/', (req, res) => {
  'use strict'
  mongodb.database.collection('admins').findOne({
    _id: mongodb.ObjectId(req.session._id),
    username: req.session.username
  }, (err, result) => {
    if (err) console.log(err)
    if (result) {
      mongodb.database.collection('students').find().toArray((err, data) => {
        'use strict'
        if (err) console.log(err)
        res.render('edit', {title: 'Edit Profile', students: data})
      })
    } else {
      res.redirect('login')
    }
  })
})

router.post('/view', (req, res, next) => {
  'use strict'
  mongodb.database.collection('students').findOne({
    _id: mongodb.ObjectId(req.body.id)
  }, (err, result) => {
    if (err) console.log(err)
    res.send(result)
  })
})

module.exports = router
