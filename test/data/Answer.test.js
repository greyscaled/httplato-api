/* eslint-env mocha */

const assert = require('assert')
const DatabaseManager = require('../../data/')
const { genericAnswerData, genericQuestionData } = require('../mocks/')

describe('DatabaseManager.AnswerQueries', function () {
  before(function () { DatabaseManager.connect() })
  after(function () { DatabaseManager.close() })

  /*
   * new AnswerQueries()
   */
  describe('constructor', function () {
    it('has the super class properties', function () {
      assert.strictEqual(DatabaseManager.AnswerQueries.db, DatabaseManager.db)
    })
  })

  /*
   * getters
   */
  describe('getters', function () {
    it('publicAttributes', function () {
      assert.strictEqual(DatabaseManager.AnswerQueries.publicAttributes.constructor, Array)
      assert.strict.deepEqual(DatabaseManager.AnswerQueries.publicAttributes.sort(), [
        'answer', 'created', 'edited', 'id', 'question_id'
      ])
    })

    it('privateAttributes', function () {
      assert.strictEqual(DatabaseManager.AnswerQueries.privateAttributes.constructor, Array)
      assert.strictEqual(DatabaseManager.AnswerQueries.privateAttributes.length, 0)
    })

    it('timestampAttributes', function () {
      assert.strictEqual(DatabaseManager.AnswerQueries.timestampAttributes.constructor, Array)
      assert.strict.deepEqual(DatabaseManager.AnswerQueries.timestampAttributes.sort(), [
        'created', 'edited'
      ])
    })
  })

  /*
   * getAllAnswers() : Array
   */
  describe('getAllAnswers()', function () {
    it('returns an Array', async function () {
      const data = await DatabaseManager.AnswerQueries.getAllAnswers()
      assert(data.length)
      assert.strictEqual(data.constructor, Array)
    })

    it('rejects with an error if db is down', function () {
      DatabaseManager.close()
      DatabaseManager.AnswerQueries.getAllAnswers()
        .then(_ => assert.fail())
        .catch(err => {
          assert.strictEqual(err.message, 'Connection pool of the database object has been destroyed.')
        })
      DatabaseManager.connect()
    })
  })

  /*
   * getAnswerToQuestion(number: questionid) : Object
   */
  describe('getAnswerToQuestion(questionid)', function () {
    it('returns an Object', async function () {
      let id = await DatabaseManager
        .db
        .one('SELECT id FROM public.questions LIMIT 1', [true], val => val.id)
      const data = await DatabaseManager.AnswerQueries.getAnswerToQuestion(id)
      assert.strictEqual(typeof data, 'object')
    })

    it('rejects with an error if db is down', function () {
      DatabaseManager.close()
      DatabaseManager.AnswerQueries.getAnswerToQuestion(1)
        .then(() => assert.fail())
        .catch((err) => {
          assert.strictEqual(err.message, 'Connection pool of the database object has been destroyed.')
        })
      DatabaseManager.connect()
    })

    it('rejects with error if id not found', function () {
      DatabaseManager.AnswerQueries.getAnswerToQuestion(-1)
        .then(() => assert.fail())
        .catch((err) => {
          assert.strictEqual(err.message, 'No data returned from the query.')
        })
    })
  })

  /*
   * submitAnswerToQuestion(number: question, jsonb: answer) : Object
   */
  describe('submitAnswerToQuestion(question, answer)', function () {
    it('returns an Answer Object', async function () {
      let id = await DatabaseManager
        .db
        .one(
          'INSERT into public.questions(type, content) VALUES($1, $2) RETURNING id;',
          ['tf', genericQuestionData()],
          val => val.id
        )
      const answer = await DatabaseManager.AnswerQueries.submitAnswerToQuestion(id, genericAnswerData())
      assert.strictEqual(answer.question_id, id)
      assert.strict.deepEqual(Object.keys(answer).sort(), DatabaseManager.AnswerQueries.publicAttributes.sort())
    })

    it('rejects with an error if db is down', function () {
      DatabaseManager.close()
      DatabaseManager.AnswerQueries.submitAnswerToQuestion(1, genericAnswerData())
        .then(() => assert.fail())
        .catch((err) => {
          assert.strictEqual(err.message, 'Connection pool of the database object has been destroyed.')
        })
      DatabaseManager.connect()
    })
  })
})
