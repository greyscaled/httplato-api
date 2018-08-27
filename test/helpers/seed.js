const { genericAnswerData, genericQuestionData } = require('../mocks')
const DatabaseManager = require('../../data')

DatabaseManager.connect()
const db = DatabaseManager.db

const SEEDS = {
  questions: [
    'tf',
    'mc',
    'fill',
    'sa',
    'choose'
  ],
  answers: [
    'tf',
    'mc',
    'fill',
    'sa',
    'choose'
  ]
}

fillQuestions()
  .then((ids) => {
    fillAnswers(ids)
      .then(_ => DatabaseManager.close())
  })

function fillQuestions () {
  return new Promise(async (resolve, reject) => {
    const ids = []
    for (let i = 0; i < SEEDS.questions.length; i++) {
      let { type, content } = genericQuestionData(SEEDS.questions[i])
      const id = await db.one('INSERT into public.questions(type, content) VALUES($1, $2) RETURNING id', [type, content], val => val.id)
        .catch(e => {
          console.log('ERROR', e)
          DatabaseManager.close()
          process.exit(1)
        })
      ids.push(id)
    }
    resolve(ids)
  })
}

function fillAnswers (ids) {
  return new Promise(async (resolve, reject) => {
    for (let i = 0; i < SEEDS.answers.length; i++) {
      let questionId = ids[i]
      let { answer } = genericAnswerData(SEEDS.answers[i])
      await db.none('INSERT into public.answers(answer, question_id) VALUES($1, $2)', [answer, questionId])
        .catch(e => {
          console.log('ERROR', e)
          DatabaseManager.close()
          process.exit(1)
        })
    }
    resolve()
  })
}
