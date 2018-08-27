/* eslint-env mocha */

const assert = require('assert')
const httpMocks = require('node-mocks-http')

const { Answers } = require('../../controllers')
const { nextMock } = require('../mocks')
const DatabaseManager = require('../../data/')

describe('Answer Controllers', function () {
  before(function () { DatabaseManager.connect() })
  after(function () { DatabaseManager.close() })

  describe('Answers.getAllAnswers()', function () {
    beforeEach(async function () {
      this.next = nextMock()
      this.res = httpMocks.createResponse()
      await Answers.getAllAnswers(httpMocks.createRequest(), this.res, this.next.next)
    })

    it('responds 200', function () {
      assert.strictEqual(this.res._getStatusCode(), 200)
      assert.strictEqual(this.res._getStatusMessage(), 'OK')
    })

    it('responds with an array', function () {
      let data = JSON.parse(this.res._getData())
      assert.strictEqual(data.constructor, Array)
      assert(data.length)
    })

    it('calls next on error', async function () {
      assert.strictEqual(this.next.nextCalled, 0)
      DatabaseManager.close()
      await Answers.getAllAnswers(httpMocks.createRequest(), this.res, this.next.next.bind(this.next))
      DatabaseManager.connect()
    })
  })
})
