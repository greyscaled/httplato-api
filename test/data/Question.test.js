/* eslint-env mocha */

const assert = require('assert')
const DatabaseManager = require('../../data/')
const { genericQuestionData } = require('../mocks/')

describe('DatabaseManager.QuestionQueries', function () {
  before(function () { DatabaseManager.connect() })
  after(function () { DatabaseManager.close() })

  /*
   * new QuestionQueries()
   */
  describe('constructor', function () {
    it('has the super class properties', function () {
      assert.strictEqual(DatabaseManager.QuestionQueries.db, DatabaseManager.db)
    })
  })

  /*
   * getters
   */
  describe('getters', function () {
    it('publicAttributes', function () {
      assert.strictEqual(DatabaseManager.QuestionQueries.publicAttributes.constructor, Array)
      assert.strict.deepEqual(DatabaseManager.QuestionQueries.publicAttributes.sort(), [
        'content', 'created', 'edited', 'id', 'type'
      ])
    })

    it('privateAttributes', function () {
      assert.strictEqual(DatabaseManager.QuestionQueries.privateAttributes.constructor, Array)
      assert.strictEqual(DatabaseManager.QuestionQueries.privateAttributes.length, 0)
    })

    it('timestampAttributes', function () {
      assert.strictEqual(DatabaseManager.QuestionQueries.timestampAttributes.constructor, Array)
      assert.strict.deepEqual(DatabaseManager.QuestionQueries.timestampAttributes.sort(), [
        'created', 'edited'
      ])
    })
  })

  /*
   * getAllQuestions() : ARRAY
   */
  describe('getAllQuestions()', function () {
    it('returns an Array', async function () {
      const data = await DatabaseManager.QuestionQueries.getAllQuestions()
      assert(data.length)
      assert.strictEqual(data.constructor, Array)
    })

    it('rejects with an error if the database is down', function () {
      DatabaseManager.close()
      DatabaseManager.QuestionQueries.getAllQuestions()
        .then(() => assert.fail())
        .catch((err) => {
          assert.strictEqual(err.message, 'Connection pool of the database object has been destroyed.')
        })

      DatabaseManager.connect()
    })
  })

  /*
   * getQuestionById(number: questionid) : Object
   */
  describe('getQuestionById(questionid)', async function () {
    it('returns an Object', async function () {
      let id = await DatabaseManager
        .db
        .one('SELECT id FROM public.questions LIMIT 1', [true], val => val.id)
      const data = await DatabaseManager.QuestionQueries.getQuestionById(id)
      assert.strictEqual(typeof data, 'object')
    })

    it('rejects with an error if db is down', function () {
      DatabaseManager.close()
      DatabaseManager.QuestionQueries.getQuestionById(1)
        .then(_ => assert.fail())
        .catch(err => {
          assert.strictEqual(err.message, 'Connection pool of the database object has been destroyed.')
        })
      DatabaseManager.connect()
    })

    it('rejects with an error if id not found', function () {
      DatabaseManager.QuestionQueries.getQuestionById(-1)
        .then(_ => assert.fail())
        .catch(err => {
          assert.strictEqual(err.message, 'No data returned from the query.')
        })
    })
  })

  /*
   * submitQuestion({ string: type, json: content }) : Objct
   */
  describe('submitQuestion({type, content})', function () {
    it('returns a Question Object', async function () {
      let question = await DatabaseManager.QuestionQueries.submitQuestion({
        type: 'tf',
        content: genericQuestionData('tf')
      })
      assert.strict.deepEqual(
        Object.keys(question).sort(),
        DatabaseManager.QuestionQueries.publicAttributes.sort()
      )
    })

    it('rejects with an error if something isnt right', function () {
      DatabaseManager.QuestionQueries.submitQuestion({})
        .then(_ => assert.fail())
        .catch(err => {
          assert(err.message)
        })
    })
  })
})
