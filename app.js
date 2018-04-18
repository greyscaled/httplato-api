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

/**
 * App
 * ======
 * Express application setup.
 */
const express = require('express')
const helmet = require('helmet')
const RateLimit = require('express-rate-limit')

const app = express()
/// //////////////////////////////////////////////////////////////////////////////
/// Pre-Route Middleware
/// //////////////////////////////////////////////////////////////////////////////

// add default helmet security header middlewares
app.use(helmet())

// setup rate limiting
app.enable('trust proxy')

const limiter = new RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 1000 requests per windowMs
  delayMs: 0 // disable delaying
})

app.use(limiter)

/// //////////////////////////////////////////////////////////////////////////////
/// Routing
/// //////////////////////////////////////////////////////////////////////////////
require('./routes/question-routes')(app)

/// //////////////////////////////////////////////////////////////////////////////
/// Post-Route Middleware
/// //////////////////////////////////////////////////////////////////////////////

// 404 Handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

module.exports = app
