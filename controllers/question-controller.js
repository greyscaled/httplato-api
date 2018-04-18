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
const Question = require('../models').Question
const Answer = require('../models').Answer
const Tag = require('../models').Tag

const ANSWER_ATTRIBUTES = [
  'id',
  'answer',
  'createdAt',
  'updatedAt'
]

module.exports = {
  async getAnswerToQuestion (req, res, next) {
    const { question } = req.params
    if (!question) {
      return res.status(400).send()
    }

    const q = await Question.findById(question, {
      attributes: [],
      include: [{
        as: 'Answer',
        attributes: ANSWER_ATTRIBUTES,
        model: Answer
      }]
    })
    if (!q) {
      return res.status(404).send()
    } else {
      return res.send(q.toJSON())
    }
  },

  async getQuestionById (req, res, next) {
    const { question } = req.params
    if (!question) {
      return res.status(400).send()
    }

    const q = await Question.findById(question, {
      include: [{
        as: 'Tags',
        model: Tag
      }]
    })

    if (q) {
      res.send(q.toJSON())
    } else {
      res.status(404).send()
    }
  },
  async getQuestions (req, res, next) {
    const questions = await Question.findAll({
      include: [{
        as: 'Tags',
        model: Tag
      }]
    })

    if (questions) {
      res.json(questions)
    } else {
      res.status(404).send()
    }
  }
}
