const express = require('express')

// express-session session 中间件
const session = require('express-session')

// 将 sesssion 数据存放到 mysql 数据库的 store
const MySQLStore = require('express-mysql-session')(session)

// 数据库的连接
const { connection } = require('./db/index')

// 引入 body-parser
const bodyParser = require('body-parser')

// 路由
const router = require('./routes/index')

// 配置
const { serverHost, serverPort } = require('./config')

const sessionStore = new MySQLStore({}, connection);

const app = express()

// 使用 session
app.use(session({
  key: 'course_selection_session',
  secret: 'course_selection_session_secret',
  store: sessionStore,
  resave: false,
  cookie: {
    secure: false,  // 可用于 http
    maxAge: 1000 * 60 * 60 * 24 * 3  // 单位 毫秒。 三天
  },
  saveUninitialized: false
}))

// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// 解析 application/json
app.use(bodyParser.json())


// 路由
app.use('/cs/api', router)

// 重定向
app.get('/', (req, res) => {
  res.redirect(301, '/cs-v/index.html')
})

// 页面资源
app.use('/cs-v', express.static('./public/views'))

app.listen(serverPort, () => {
  console.log(`${serverHost}:${serverPort}`)
})