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
const debug = require('debug')('httplato::data/Question.js')

// internals
const BaseDAO = require('./dao')

class QuestionQueries extends BaseDAO {
  constructor (options) {
    super(options)
    this.attributes = {
      public: [
        'id',
        'type',
        'content',
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
   * Retrieves all Questions
   *
   * @returns {Array.<object>} an Array of Questions
   */
  getAllQuestions () {
    debug('querying All Questions')
    return new Promise((resolve, reject) => {
      this
        .db
        .any('SELECT * FROM public.questions ORDER BY random()', [true])
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
  }

  /**
   * Retrieves a Question
   *
   * @param {number} questionid
   * @returns {object} retrieved Question
   */
  getQuestionById (questionid) {
    debug('querying question with id %d', questionid)
    return new Promise((resolve, reject) => {
      this
        .db
        .one('SELECT * FROM public.questions WHERE questions.id = $1', questionid)
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
  }

  /**
   * Submit new Question
   *
   * @param {object} question
   * @param {string} question.type - one of 'tf', 'fill', 'sa', 'mc', 'choose'
   * @param {object} content - formatted question content
   */
  submitQuestion ({ type, content }) {
    debug('inserting question of type %s', type)
    return new Promise((resolve, reject) => {
      this
        .db
        .one('INSERT into public.questions(type, content) VALUES($/type/, $/content/) RETURNING *;', { type, content })
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
  }
}

module.exports = QuestionQueries
