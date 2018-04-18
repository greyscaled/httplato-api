if (process.env.NODE_ENV === 'production') {
  // we are in production - prod keys
  module.exports = require('./prod')
} else if (process.env.NODE_ENV === 'test') {
  module.exports = require('./test')
} else {
  // development
  module.exports = require('./dev')
}
