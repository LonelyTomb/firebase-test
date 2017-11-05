const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectId = mongodb.ObjectID

module.exports.ObjectId = ObjectId

let uri = 'mongodb://lonelytomb:construct8@ds243055.mlab.com:43055/srq'

let db = MongoClient.connect(uri, (err, database) => {
  'use strict'
  if (err) return console.log(err)
  module.exports.database = database
  return database
})

module.exports.db = db
