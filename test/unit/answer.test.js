/* eslint-env mocha */

/**
 * Answer Model Unit Test
 */
const assert = require('assert')
const Utils = require('../data/test-data')

describe('models/answer', function () {
  this.timeout(5000)
  before(function () {
    return require('../../models').sequelize.sync({ force: true })
  })

  beforeEach(function () {
    this.Question = require('../../models').Question
    this.Answer = require('../../models').Answer
  })

  afterEach(async function () {
    await this.Question.truncate({ cascade: true })
    await this.Answer.truncate({ cascade: true })
  })

  describe('Answer model CRUD', function () {
    it('Creates an Answer', async function () {
      const answer = await this.Answer.create(Utils.genericAnswerData())
      let keys = Object.keys(Utils.genericAnswerData())
      keys.forEach(key => {
        assert.deepEqual(
          answer.get(`${key}`),
          Utils.genericAnswerData()[`${key}`]
        )
      })
    })

    it('Reads an Answer', async function () {
      await this.Answer.create(Utils.genericAnswerData())
      const answers = await this.Answer.findAll({})
      assert.strictEqual(answers.length, 1)
      let keys = Object.keys(Utils.genericAnswerData())
      keys.forEach(key => {
        assert.deepEqual(
          answers[0].get(`${key}`),
          Utils.genericAnswerData()[`${key}`]
        )
      })
    })

    it('Updates an Answer', async function () {
      const answer = await this.Answer.create(Utils.genericAnswerData())
      await answer.update(Utils.genericAnswerData('mc'))
      assert.deepEqual(answer.get('content'), Utils.genericAnswerData('mc')['content'])
    })

    it('Deletes an Answer', async function () {
      const answer = await this.Answer.create(Utils.genericAnswerData())
      await answer.destroy()
      const noAnswers = await this.Answer.findAll({})
      assert.strictEqual(noAnswers.length, 0)
    })
  })

  describe('Answer Associations', function () {
    it('belongsTo Question', async function () {
      const question = await this.Question.create(Utils.genericQuestionData('tf'))
      const answer = await this.Answer.create(Utils.genericAnswerData('tf'))
      await answer.setQuestion(question)
      const answerQ = await answer.getQuestion()
      assert.deepEqual(answerQ.toJSON(), question.toJSON())
    })
  })
})
