const debug = require('debug')('httplato::data/sql/index.js')
const path = require('path')
const pgp = require('pg-promise')

/**
 * Helper function to link to query files
 *
 * @param {string} file - location of an SQL file
 * @returns {object} QueryFile
 */
module.exports = (file) => {
  const fullPath = path.join(__dirname, file)
  debug('creating QueryFile from %s', fullPath)
  return new pgp.QueryFile(fullPath, { minify: true })
}
