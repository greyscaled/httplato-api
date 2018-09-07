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
const debug = require('debug')('httplato::controllers/answer-controller.js')

// internals
const DatabaseManager = require('../data')

/** Answer Controller */
module.exports = {
  /**
   * Retrieves all Answers
   * @param {Object} req
   * @param {Object} res
   * @param {function} next
   */
  async getAllAnswers (req, res, next) {
    try {
      debug('retrieving all answers')
      const data = await DatabaseManager.AnswerQueries.getAllAnswers()
      return res
        .status(200)
        .json(data)
    } catch (e) {
      debug('Error retrieving answers, %O', e)
      next(e)
    }
  }
}
