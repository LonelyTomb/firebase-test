let express = require('express')
let router = express.Router()
const mongodb = require('./../mongo-init')

/* GET users listing. */
router.get('/', (req, res, next) => {
  mongodb.database.collection('students').find().toArray((err, result) => {
    'use strict'
    if (err) console.log(err)
    res.render('users', {title: 'Users', students: result})
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
