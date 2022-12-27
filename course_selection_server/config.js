const dbOption = {
  host: 'localhost',
  user: 'root',
  port: '3306',
  charset:'UTF8_GENERAL_CI',
  password: '123456',
  database: 'course_selection'
}

const serverHost = 'http://localhost'
const serverPort = 3000

module.exports = {
  dbOption,
  serverHost,
  serverPort
}