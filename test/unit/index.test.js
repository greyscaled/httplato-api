/* eslint-env mocha */

/**
 * Simple smoke test for each model
 */
const assert = require('assert')

describe('models/index', function () {
  const models = require('../../models')

  it('returns answer model', function () {
    assert.ok(models.Answer)
    assert(models.Answer instanceof Object)
  })

  it('returns question model', function () {
    assert.ok(models.Question)
    assert(models.Question instanceof Object)
  })

  it('returns tag model', function () {
    assert.ok(models.Tag)
    assert(models.Tag instanceof Object)
  })
})
