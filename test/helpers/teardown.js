const DatabaseManager = require('../../data')
DatabaseManager.connect()
const db = DatabaseManager.db

tearDown(['questions', 'answers'])
  .then(_ => DatabaseManager.close())

function tearDown (tables) {
  return new Promise(async (resolve, reject) => {
    for (let i = 0; i < tables.length; i++) {
      let table = tables[i]
      await db.none('TRUNCATE TABLE public.$1:name CASCADE;', table)
        .catch(e => {
          console.log('ERROR', e)
          DatabaseManager.close()
          process.exit(1)
        })
    }
    resolve()
  })
}
