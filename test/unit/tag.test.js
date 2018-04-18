/* eslint-env mocha */

/**
 * Tag Model Unit Test
 */
const assert = require('assert')
const Utils = require('../data/test-data')

describe('models/Tag', function () {
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

  describe('Tag model CRUD', function () {
    it('Creates a Tag', async function () {
      const tag = await this.Tag.create(Utils.genericTagData('test'))
      let keys = Object.keys(Utils.genericTagData('test'))
      keys.forEach(key => {
        assert.deepEqual(
          tag.get(`${key}`),
          Utils.genericTagData('test')[`${key}`]
        )
      })
    })

    it('Reads a Tag', async function () {
      await this.Tag.create(Utils.genericTagData('test'))
      const tags = await this.Tag.findAll({})
      assert.strictEqual(tags.length, 1)
      let keys = Object.keys(Utils.genericTagData('test'))
      keys.forEach(key => {
        assert.deepEqual(
          tags[0].get(`${key}`),
          Utils.genericTagData('test')[`${key}`]
        )
      })
    })

    it('Updates a Tag', async function () {
      const tag = await this.Tag.create(Utils.genericTagData('tst'))
      await tag.update(Utils.genericTagData('test'))
      assert.strictEqual(tag.get('tag'), 'test')
    })

    it('Deletes a Tag', async function () {
      const tag = await this.Tag.create(Utils.genericTagData('test'))
      await tag.destroy()
      const noTags = await this.Tag.findAll({})
      assert.strictEqual(noTags.length, 0)
    })
  })

  describe('Tag Associations', function () {
    it('belongsToMany Questions', async function () {
      const tag = await this.Tag.create(Utils.genericTagData('node'))
      const question1 = await this.Question.create(Utils.genericQuestionData())
      const question2 = await this.Question.create(Utils.genericQuestionData())
      await tag.setQuestions([question1, question2])
      const taggedQuestions = await tag.getQuestions()
      assert.strictEqual(taggedQuestions.length, 2)
      taggedQuestions.forEach(question => {
        assert.deepEqual(
          JSON.parse(question.toJSON().content),
          JSON.parse(Utils.genericQuestionData().content)
        )
      })
    })
  })
})
