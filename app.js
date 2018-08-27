/**
 * @file Express Application Configuration
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

/**
 * Configures and exports an Express Application
 *
 * @param {Object} options
 * @param {number|string} options.port
 * @returns {Object} app
 */
module.exports = function ({ port }) {
  // eslint-disable-next-line no-unused-vars
  const debug = require('debug')('httplato::app.js')

  // dependencies
  const express = require('express')
  const helmet = require('helmet')
  const RateLimit = require('express-rate-limit')

  // internals
  const { internalError } = require('./middleware/')

  // Configuration -----------------------------------//
  debug('configuring express application')

  const app = express()

  // set port from param
  if (port) {
    debug('setting port to %d', port)
    app.set('port', port)
  }

  // for use behind Heroku proxy
  app.enable('trust proxy')

  // PRE-ROUTE ---------------------------------------//

  // adds basic security headers
  app.use(helmet())

  app.use(new RateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 10000,
    delayMS: 0
  }))

  // ROUTING -----------------------------------------//
  require('./routes/')(app)

  // POST-ROUTE --------------------------------------//
  app.use(internalError)

  return app
}
