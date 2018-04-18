/* eslint-env mocha */

/**
 * Question Model Unit Test
 */
const assert = require('assert')
const Utils = require('../data/test-data')

describe('models/question', function () {
  this.timeout(5000)
  before(function () {
    return require('../../models').sequelize.sync({ force: true })
  })

  beforeEach(function () {
    this.Question = require('../../models').Question
    this.Answer = require('../../models').Answer
    this.Tag = require('../../models').Tag
  })

  afterEach(async function () {
    await this.Question.truncate({ cascade: true })
    await this.Answer.truncate({ cascade: true })
    await this.Tag.truncate({ cascade: true })
  })

  describe('Question model CRUD', function () {
    it('Creates a Question', async function () {
      const question = await this.Question.create(Utils.genericQuestionData())
      let keys = Object.keys(Utils.genericQuestionData())
      keys.forEach(key => {
        assert.deepEqual(question.get(`${key}`), Utils.genericQuestionData()[`${key}`])
      })
    })

    it('Reads a Question', async function () {
      await this.Question.create(Utils.genericQuestionData())
      const questions = await this.Question.findAll({})
      assert.strictEqual(questions.length, 1)
      let keys = Object.keys(Utils.genericQuestionData())
      keys.forEach(key => {
        assert.deepEqual(
          questions[0].get(`${key}`),
          Utils.genericQuestionData()[`${key}`]
        )
      })
    })

    it('Updates a Question', async function () {
      const question = await this.Question.create(Utils.genericQuestionData())
      await question.update(Utils.genericQuestionData('fill'))
      assert.strictEqual(question.get('type'), 'fill')
    })

    it('Deletes a Question', async function () {
      const question = await this.Question.create(Utils.genericQuestionData())
      await question.destroy()
      const noQuestions = await this.Question.findAll({})
      assert.strictEqual(noQuestions.length, 0)
    })
  })

  describe('Question Associations', function () {
    it('hasOne Answer', async function () {
      const question = await this.Question.create(Utils.genericQuestionData('tf'))
      const answer = await this.Answer.create(Utils.genericAnswerData('tf'))
      await question.setAnswer(answer)
      const questionAnswer = await question.getAnswer()
      assert.deepEqual(answer.toJSON(), questionAnswer.toJSON())
    })

    it('hasMany SuggestedAnswers', async function () {
      const question = await this.Question.create(Utils.genericQuestionData('sa'))
      const a1 = await this.Answer.create(Utils.genericAnswerData('sa'))
      const a2 = await this.Answer.create(Utils.genericAnswerData('sa'))
      await question.setSuggestedAnswers([a1, a2])
      const questionAnswers = await question.getSuggestedAnswers()
      assert.strictEqual(questionAnswers.length, 2)
      questionAnswers.forEach(answer => {
        assert.deepEqual(
          JSON.parse(answer.toJSON().answer),
          JSON.parse(Utils.genericAnswerData('sa').answer)
        )
      })
    })

    it('belongsToMany Tags', async function () {
      const question = await this.Question.create(
        {
          type: Utils.genericQuestionData().type,
          content: Utils.genericQuestionData().content,
          Tags: [
            { tag: Utils.genericTagData('node').tag },
            { tag: Utils.genericTagData('express').tag }
          ]
        },
        {
          include: [{
            as: 'Tags',
            model: this.Tag
          }]
        }
      )
      assert.strictEqual(question.Tags.length, 2)
      assert.strictEqual(question.Tags[0].tag, 'node')
      assert.strictEqual(question.Tags[1].tag, 'express')
    })
  })
})
