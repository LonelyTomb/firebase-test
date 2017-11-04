let express = require('express')
let router = express.Router()
const conn = require('./../mongo-init')

/* GET users listing. */
router.get('/', function (req, res, next) {
  conn.database.collection('students').find().toArray((err, result) => {
    'use strict'
    if (err) console.log(err)
    res.render('users', {title: 'Users', students: result})
  })

})

module.exports = router
