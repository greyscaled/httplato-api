/* eslint-env mocha */

const assert = require('assert')
const Controllers = require('../../controllers')

let EXPORTS = [
  'Questions'
]

describe('Controllers/index.js', function () {
  before(function () {
    this.exports = Object.keys(Controllers)
  })
  it('exports an Object', function () {
    assert.strictEqual(typeof Controllers, 'object')
  })

  it('exports each controller', function () {
    for (let i = 0; i < this.exports.length; i++) {
      let index = EXPORTS.indexOf(this.exports.pop())
      assert(index >= 0)
      EXPORTS = EXPORTS.filter((x, i) => i !== index)
    }
  })
})
