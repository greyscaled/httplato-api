/* eslint-env mocha */

const assert = require('assert')
const DatabaseManager = require('../../data/')
const { genericAnswerData, genericQuestionData } = require('../mocks')

describe('DatabaseManager.Tasks', function () {
  before(function () { DatabaseManager.connect() })
  after(function () { DatabaseManager.close() })

  /*
   * submitQuestionWithAnswer(Object: {type, content, answer}) : Object
   */
  describe('submitQuestionWithAnswer({type, content, answer})', function () {
    it('returns an Answer joined with Question', async function () {
      const newAnswer = await DatabaseManager.Tasks.submitQuestionWithAnswer({
        type: 'tf',
        content: genericQuestionData('tf'),
        answer: genericAnswerData('tf')
      })
      assert.strictEqual(typeof newAnswer, 'object')
      // get attributes for answer + question
      const answerAttrs = DatabaseManager.AnswerQueries.publicAttributes
      const questionAttrs = DatabaseManager.QuestionQueries.publicAttributes
      const joinedAttrs = [...new Set([...answerAttrs, ...questionAttrs])]
      assert.strict.deepEqual(Object.keys(newAnswer).sort(), joinedAttrs.sort())
    })

    it('commits a Rollback if something isnt right', async function () {
      const NQuestionsBefore = await DatabaseManager
        .db
        .any('SELECT * FROM public.questions;', [true])

      try {
        const answers = await DatabaseManager.Tasks.submitQuestionWithAnswer({
          type: 'tf',
          content: genericQuestionData('tf'),
          answer: null
        })
        if (answers) assert.fail()
      } catch (e) {
        assert.strictEqual(e.message, 'null value in column "answer" violates not-null constraint')
        const NQuestionsAfter = await DatabaseManager
          .db
          .any('SELECT * FROM public.questions;', [true])
        assert.strictEqual(NQuestionsBefore.length, NQuestionsAfter.length)
      }
    })
  })
})
