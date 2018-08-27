/**
 * @author Vapurrmaid <vapurrmaid@gmail.com>
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
const debug = require('debug')('httplato::data/Answer.js')

// internals
const BaseDAO = require('./dao')

class AnswerQueries extends BaseDAO {
  constructor (options) {
    super(options)
    this.attributes = {
      public: [
        'id',
        'answer',
        'question_id',
        'created',
        'edited'
      ],

      private: [],

      timestamps: [
        'created',
        'edited'
      ]
    }
  }

  /**
   * Retrieves Answers, ordered by Question id
   *
   * @returns {Array.<object>} an Array of Answers
   */
  getAllAnswers () {
    debug('querying All Answers')
    return new Promise((resolve, reject) => {
      this
        .db
        .any('SELECT * FROM public.answers ORDER BY question_id', [true])
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
  }

  /**
   * Retrieves an Answer to a Question
   *
   * @param {number} questionid
   * @returns {object} retrieved Answer Object
   */
  getAnswerToQuestion (questionid) {
    debug('querying question with id %d', questionid)
    return new Promise((resolve, reject) => {
      this
        .db
        .one('SELECT id, answer, created, edited FROM public.answers WHERE answers.question_id = $1', questionid)
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
  }

  /**
   * Inserts an Answer to a Question
   *
   * @param {number} question
   * @param {object} answer
   * @returns {object} inserted Answer Object
   */
  submitAnswerToQuestion (question, answer) {
    debug('inserting answer to question_id %d', question)
    return new Promise((resolve, reject) => {
      this
        .db
        .one('INSERT into public.answers(question_id, answer) VALUES($1, $2) RETURNING *;', [question, answer])
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
  }
}

module.exports = AnswerQueries
