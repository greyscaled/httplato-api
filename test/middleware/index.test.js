/* eslint-env mocha */

const assert = require('assert')
const Middleware = require('../../middleware')

let EXPORTS = [
  'internalError'
]

describe('middleware/index.js', function () {
  before(function () {
    this.exports = Object.keys(Middleware)
  })
  it('exports an Object', function () {
    assert.strictEqual(typeof Middleware, 'object')
  })

  it('exports each middleware', function () {
    for (let i = 0; i < this.exports.length; i++) {
      let index = EXPORTS.indexOf(this.exports.pop())
      assert(index >= 0)
      EXPORTS = EXPORTS.filter((x, i) => i !== index)
    }
  })
})
