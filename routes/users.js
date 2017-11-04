let express = require('express')
let router = express.Router()
const conn = require('./../mongo-init')

/* GET users listing. */
router.get('/', (req, res, next) => {
  conn.database.collection('students').find().toArray((err, result) => {
    'use strict'
    if (err) console.log(err)
    res.render('users', {title: 'Users', students: result})
  })
})

router.post('/view', (req, res, next) => {
  'use strict'
  conn.database.collection('students').find({
    _id: req.body.id
  }).toArray((err, result) => {
    if (err) console.log(err)
    res.send(result)
  })
})
module.exports = router
