/**
 * @file Interface to the Database
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
const debug = require('debug')('httplato::data/index.js')

// dependencies
const bluebird = require('bluebird')
const pgp = require('pg-promise')({
  connect (client, dc, useCount) {
    debug('connected to %s', client.connectionParameters.database)
  },
  promiseLib: bluebird
})

// internals
const AnswerQueries = require('./Answer')
const QuestionQueries = require('./Question')
const Tasks = require('./Tasks')

/** static class representing an interface to Database operations */
class DatabaseManager {
  /**
   * Connect to the Database and initialize DAOs
   * @throws Throws an error if the database has a connection error
   * @returns {undefined}
   */
  static connect () {
    if (!process.env.DATABASE_URL) { throw new Error('Cannot connect to database, no URL specified') }
    this.db = pgp(process.env.DATABASE_URL)
    this.AnswerQueries = new AnswerQueries({ db: this.db })
    this.QuestionQueries = new QuestionQueries({ db: this.db })
    this.Tasks = new Tasks({ db: this.db })
  }

  /**
   * Ends connection with the Database
   */
  static close () {
    this.db.$pool.end()
  }
}

module.exports = DatabaseManager
