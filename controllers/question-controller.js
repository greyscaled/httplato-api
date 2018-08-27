/**
 * @license
 * Copyright (c) 2018 Vapurrmaid
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

// eslint-disable-next-line no-unused-vars
const debug = require('debug')('httplato::controllers/question-controller.js')
const pgp = require('pg-promise')
const qrec = pgp.errors.queryResultErrorCode

// internals
const DatabaseManager = require('../data')

/** Question Controller */
module.exports = {
  /**
   * Retreives all Questions
   * @param {Object} req
   * @param {Object} res
   * @param {function} next
   */
  async getAllQuestions (req, res, next) {
    try {
      debug('retrieving all questions')
      const data = await DatabaseManager.QuestionQueries.getAllQuestions()
      return res
        .status(200)
        .json(data)
    } catch (e) {
      debug('Error retrieving questions, %O', e)
      next(e)
    }
  },

  /**
   * Retreives a specific Question from its id
   * @param {Object} req
   * @param {number} req.params.question - Question id
   * @param {Object} res
   * @param {function} next
   */
  async getQuestionById (req, res, next) {
    try {
      let question = parseInt(req.params.question)
      if (isNaN(question)) return res.status(400).send()
      debug('retrieving question with id %d', question)
      const data = await DatabaseManager.QuestionQueries.getQuestionById(question)
      return res
        .status(200)
        .json(data)
    } catch (e) {
      debug('Error retreiving question, %O', e)
      if (e.code === qrec.noData) {
        return res
          .status(404)
          .send('Not Found')
      }
      next(e)
    }
  },

  /**
   * Retreives an answer from a specific question.
   * @param {Object} req
   * @param {number} req.params.question - Question id
   * @param {Object} res
   * @param {function} next
   */
  async getAnswerForQuestion (req, res, next) {
    try {
      let question = parseInt(req.params.question)
      if (isNaN(question)) return res.status(400).send()
      debug('retrieving answer for question with id %d', question)
      const data = await DatabaseManager.AnswerQueries.getAnswerToQuestion(question)
      return res
        .status(200)
        .json(data)
    } catch (e) {
      debug('Error %O retrieving answer', e)
      if (e.code === qrec.noData) {
        return res
          .status(404)
          .send('Not Found')
      }
      next(e)
    }
  }
}
