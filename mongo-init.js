const PouchDB = require('pouchdb')

let db = new PouchDB('srq')
let remoteDB = new PouchDB('http://localhost:5984/srq')

db.sync(remoteDB, {live: true})
module.exports.db = db
