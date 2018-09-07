/* eslint-env mocha */

const assert = require('assert')
const httpMocks = require('node-mocks-http')

const { internalError } = require('../../middleware')
const { nextMock } = require('../mocks')

describe('middleware/errors.js', function () {
  beforeEach(async function () {
    this.err = 'error'
    this.req = httpMocks.createRequest()
    this.res = httpMocks.createResponse()
    this.next = nextMock()
  })
  describe('internalError (err, req, res, next)', function () {
    beforeEach(function () {
      internalError(this.err, this.req, this.res, this.next.next)
    })

    it('set status to 500', function () {
      assert.strictEqual(this.res._getStatusCode(), 500)
    })

    it('sends Interal error message', function () {
      assert.strictEqual(this.res._getData(), 'Internal error')
    })
  })
})
