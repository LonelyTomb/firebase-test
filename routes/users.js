let express = require('express')
let router = express.Router()
const pouchdb = require('./../mongo-init')

/* GET users listing. */
router.get('/', (req, res, next) => {
  pouchdb.db.allDocs({
    include_docs: true
  }).then((result) => {
    'use strict'
    // console.log(result.rows)
    res.render('users', {title: 'Users', students: result.rows})
  }).catch((err) => {
    console.log(err)
  })
})

// View Selected Profile

router.post('/view', (req, res, next) => {
  'use strict'
  pouchdb.db
    .get(req.body.id)
    .then((doc) => {
      res.send(doc)
    })
    .catch((err) => {
      console.log(req.body.id)
      console.log(err)
    })
})
module.exports = router
