/* eslint-env mocha */

const assert = require('assert')

const DatabaseManager = require('../../data/')

describe('DatabaseManager', function () {
  after(function () { DatabaseManager.close() })
  describe('DatabaseManager.connect()', function () {
    it('opens a connection to the database', function () {
      DatabaseManager.connect()
      assert.strictEqual(DatabaseManager.db.$cn, process.env.DATABASE_URL)
    })

    it('throws an Error if DATABASE_URL not defined', function () {
      let temp = process.env.DATABASE_URL
      process.env.DATABASE_URL = ''
      assert.throws(
        () => { DatabaseManager.connect() },
        /Cannot connect to database, no URL specified/
      )
      process.env.DATABASE_URL = temp
    })
  })
})
