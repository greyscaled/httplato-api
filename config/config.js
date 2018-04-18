module.exports = {
  development: {
    dialect: 'postgres',
    username: 'studying',
    password: 'test',
    database: 'studying_dev',
    host: 'localhost'
  },
  test: {
    dialect: 'postgres',
    username: 'studying',
    password: 'test',
    database: 'studying_test',
    host: 'localhost',
    logging: false // toggle if you want to see postgreSQL queries
  },
  production: {
    dialect: 'postgres',
    dialectOptions: {
      ssl: true
    },
    protocol: 'postgres',
    use_env_variable: 'DATABASE_URL'
  }
}
