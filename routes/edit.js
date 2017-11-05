const express = require('express')
const router = express.Router()
const session = require('express-session')
const mongodb = require('./../mongo-init')
const bodyParser = require('body-parser')

router.use(bodyParser.json())

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

router.put('/save', (req, res, next) => {
  'use strict'
  mongodb.database.collection('students').findOneAndUpdate({
    _id: mongodb.ObjectId(req.body._id)
  }, {
    name: req.body.name,
    dob: req.body.dob,
    gender: req.body.gender,
    phone: req.body.phone,
    email: req.body.email,
    department: req.body.department
  }, {
    upsert: false
  }, (err, result) => {
    if (err) console.log(err)
    res.send(result)
  })
})
module.exports = router
