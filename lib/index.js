'use strict'

const ConflictError = require('./errors/conflict')
const DeletedError = require('./errors/deleted')
const NotFoundError = require('./errors/not-found')
const OperationOutcomeError = require('./errors/operation-outcome')
const Repo = require('./repo')
const Store = require('./store')
const ValidationError = require('./errors/validation')
const {MongoClient} = require('mongodb')

const DEFAULT_DB_OPTIONS = {
  // Force the server to generate ids so that they don't get added to the resources
  forceServerObjectId: true
}

function connect ({base = 'http://localhost/', db: url, dbOptions}, callback) {
  const options = Object.assign({}, DEFAULT_DB_OPTIONS, dbOptions)
  MongoClient.connect(url, options, (err, db) => {
    if (err) {
      return callback(err)
    }
    const repo = new Repo(db)
    const store = new Store({base, repo})
    callback(null, store)
  })
}

module.exports = exports = {
  connect,
  ConflictError,
  DeletedError,
  NotFoundError,
  OperationOutcomeError,
  ValidationError
}
