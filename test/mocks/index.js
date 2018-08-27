const GENERIC_ANSWER_CONTENT_TF = JSON.stringify({
  before: '',
  blocks: [{
    tf: true
  }],
  after: ''
})

const GENERIC_ANSWER_CONTENT_MC = JSON.stringify({
  before: '',
  blocks: [{
    mc: {
      index: 1,
      value: '1'
    }
  }],
  after: ''
})

const GENERIC_ANSWER_CONTENT_FILL = JSON.stringify({
  before: '',
  blocks: [{
    fill: 'blank'
  }],
  after: ''
})

const GENERIC_ANSWER_CONTENT_SA = JSON.stringify({
  before: '',
  blocks: [{
    sa: 'A short answer'
  }],
  after: ''
})

const GENERIC_ANSWER_CONTENT_CHOOSE = JSON.stringify({
  before: '',
  blocks: [{
    choose: { option: 'option1' }
  }],
  after: ''
})

const GENERIC_QUESTION_CONTENT_TF = JSON.stringify({
  question: {
    blocks: [
      {
        type: 'tf'
      },
      {
        type: 'text',
        content: 'Is it true?'
      }
    ]
  }
})

const GENERIC_QUESTION_CONTENT_MC = JSON.stringify({
  question: {
    blocks: [{
      type: 'text',
      content: 'Choose from the options'
    }]
  },
  options: {
    type: 'mc',
    delimeter: 'num',
    number: '4',
    values: {
      '1': 'option 1',
      '2': '{}',
      '3': 'option 3',
      '4': 'option 4'
    }
  }
})

const GENERIC_QUESTION_CONTENT_FILL = JSON.stringify({
  question: {
    blocks: [
      {
        type: 'text',
        content: 'Fill in the'
      },
      {
        type: 'fill'
      }
    ]
  }
})

const GENERIC_QUESTION_CONTENT_SA = JSON.stringify({
  question: {
    blocks: [
      {
        type: 'text',
        content: 'What is this question?'
      }
    ]
  }
})

const GENERIC_QUESTION_CONTENT_CHOOSE = JSON.stringify({
  question: {
    blocks: [
      {
        type: 'text',
        content: 'The'
      },
      {
        type: 'choose',
        content: 'cat,dog'
      },
      {
        type: 'text',
        content: 'is named Felix.'
      }
    ]
  }
})

module.exports = {
  nextMock: () => {
    return {
      nextCalled: 0,
      next (err) {
        this.nextCalled++
        if (err) this.error = err
      }
    }
  },

  genericAnswerData (t = 'tf', withContent) {
    let content = GENERIC_ANSWER_CONTENT_TF

    if (typeof t === 'string' || t instanceof String) {
      if (t === 'tf') {
        content = GENERIC_ANSWER_CONTENT_TF
      } else if (t === 'mc') {
        content = GENERIC_ANSWER_CONTENT_MC
      } else if (t === 'fill') {
        content = GENERIC_ANSWER_CONTENT_FILL
      } else if (t === 'sa') {
        content = GENERIC_ANSWER_CONTENT_SA
      } else if (t === 'choose') {
        content = GENERIC_ANSWER_CONTENT_CHOOSE
      }
    }

    if (withContent !== null && typeof withContent === 'object') {
      content = withContent
    }
    return {
      answer: content
    }
  },

  genericQuestionData (t = 'tf', withContent) {
    let question = GENERIC_QUESTION_CONTENT_TF

    if (typeof t === 'string' || t instanceof String) {
      if (t === 'tf') {
        question = GENERIC_QUESTION_CONTENT_TF
      } else if (t === 'mc') {
        question = GENERIC_QUESTION_CONTENT_MC
      } else if (t === 'fill') {
        question = GENERIC_QUESTION_CONTENT_FILL
      } else if (t === 'sa') {
        question = GENERIC_QUESTION_CONTENT_SA
      } else if (t === 'choose') {
        question = GENERIC_QUESTION_CONTENT_CHOOSE
      }
    }

    if (withContent !== null && typeof withContent === 'object') {
      question = withContent
    }
    return {
      type: t,
      content: question
    }
  },

  genericTagData (tag = 'test') {
    return {
      tag
    }
  }
}
