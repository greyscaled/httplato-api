/* eslint-env mocha */

const assert = require('assert')
const httpMocks = require('node-mocks-http')

const { Questions } = require('../../controllers')
const { nextMock } = require('../mocks')
const DatabaseManager = require('../../data/')

describe('Question Controller', function () {
  before(function () { DatabaseManager.connect() })
  after(function () { DatabaseManager.close() })

  describe('Questions.getAllQuestions()', function () {
    beforeEach(async function () {
      this.next = nextMock()
      this.res = httpMocks.createResponse()
      await Questions.getAllQuestions(httpMocks.createRequest(), this.res, this.next.next)
    })

    it('responds 200', function () {
      assert.strictEqual(this.res._getStatusCode(), 200)
    })

    it('responds with any array', function () {
      let data = JSON.parse(this.res._getData())
      assert.strictEqual(data.constructor, Array)
    })

    it('calls next on error', async function () {
      assert.strictEqual(this.next.nextCalled, 0)
      DatabaseManager.close()
      await Questions.getAllQuestions(httpMocks.createRequest, this.res, this.next.next.bind(this.next))
      assert.strictEqual(this.next.nextCalled, 1)
      DatabaseManager.connect()
    })
  })

  describe('Questions.getQuestionById(question)', function () {
    beforeEach(async function () {
      this.q = await DatabaseManager.db.one(
        'SELECT * FROM public.questions LIMIT 1',
        [true]
      )
      this.res = httpMocks.createResponse()
      this.next = nextMock()
      await Questions.getQuestionById(httpMocks.createRequest({
        params: { question: parseInt(this.q.id) }
      }), this.res, this.next.next)
    })

    it('responds 200', async function () {
      assert.strictEqual(this.res._getStatusCode(), 200)
      assert.strictEqual(this.res._getStatusMessage(), 'OK')
    })

    it('contains question data', function () {
      let data = JSON.parse(this.res._getData())
      assert.strict.deepEqual(
        Object.keys(this.q).sort(),
        Object.keys(data).sort()
      )
    })

    it('responds 400 if no param', async function () {
      await Questions.getQuestionById(httpMocks.createRequest(), this.res, this.next.next)
      assert.strictEqual(this.res._getStatusCode(), 400)
    })

    it('responds 404 if not found', async function () {
      await Questions.getQuestionById(httpMocks.createRequest({
        params: { question: -1 }
      }), this.res, this.next.next)
      assert.strictEqual(this.res._getStatusCode(), 404)
    })

    it('calls next if other error', async function () {
      DatabaseManager.close()
      await Questions.getQuestionById(httpMocks.createRequest({
        params: { question: 1 }
      }), this.res, this.next.next.bind(this.next))
      assert.strictEqual(this.next.nextCalled, 1)
      DatabaseManager.connect()
    })
  })

  describe('Questions.getAnswerForQuestion', function () {
    beforeEach(async function () {
      this.q = await DatabaseManager.db.one(
        'SELECT * FROM public.questions LIMIT 1',
        [true]
      )
      this.res = httpMocks.createResponse()
      this.next = nextMock()
      await Questions.getAnswerForQuestion(httpMocks.createRequest({
        params: { question: parseInt(this.q.id) }
      }), this.res, this.next.next)
    })

    it('responds 200', function () {
      assert.strictEqual(this.res._getStatusCode(), 200)
      assert.strictEqual(this.res._getStatusMessage(), 'OK')
    })

    it('contains Answer data', async function () {
      let data = JSON.parse(this.res._getData())
      let answer = await DatabaseManager.db.one(
        'SELECT * FROM public.answers WHERE question_id = $1',
        [this.q.id]
      )
      assert.strictEqual(answer.id, data.id)
    })

    it('responds 400 if no param', async function () {
      await Questions.getAnswerForQuestion(httpMocks.createRequest(), this.res, this.next.next)
      assert.strictEqual(this.res._getStatusCode(), 400)
    })

    it('responds 404 if not found', async function () {
      await Questions.getAnswerForQuestion(httpMocks.createRequest({
        params: { question: -1 }
      }), this.res, this.next.next)
      assert.strictEqual(this.res._getStatusCode(), 404)
    })

    it('calls next if other error', async function () {
      DatabaseManager.close()
      await Questions.getAnswerForQuestion(httpMocks.createRequest({
        params: { question: 1 }
      }), this.res, this.next.next.bind(this.next))
      assert.strictEqual(this.next.nextCalled, 1)
      DatabaseManager.connect()
    })
  })
})
