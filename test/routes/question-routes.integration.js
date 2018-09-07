/* eslint-env mocha */

const assert = require('assert')
const DataBaseManager = require('../../data')
const express = require('express')
const request = require('supertest')

// setup
const app = express()
require('../../routes')(app)

describe('/questions Router', function () {
  before(function () { DataBaseManager.connect() })
  after(function () { DataBaseManager.close() })

  /*
   * GET /questions
   */
  describe('GET /questions', function () {
    it('responds 200', function () {
      return request(app)
        .get('/questions')
        .set('Accept', 'application/json')
        .expect(200)
    })

    it('has a list of Questions', async function () {
      const compare = (a, b) => (a.id - b.id)
      let data = await DataBaseManager.QuestionQueries.getAllQuestions()
      data.sort(compare)
      return request(app)
        .get('/questions')
        .set('Accept', 'application/json')
        .then(response => {
          assert.strictEqual(response.body.constructor, Array)
          assert.strictEqual(response.body.length, data.length)
          let sortedResponse = response.body.sort(compare)
          sortedResponse.forEach((q, i) => {
            assert.strictEqual(q.id, data[i].id)
          })
        })
    })

    it('responds 500 if server is down', function () {
      DataBaseManager.close()
      return request(app)
        .get('/questions')
        .set('Accept', 'application/json')
        .expect(500)
        .then(_ => { DataBaseManager.connect() })
    })
  })
})
