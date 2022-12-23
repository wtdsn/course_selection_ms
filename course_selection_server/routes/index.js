const router = require('express').Router()

const Login = require('./login')
const admin = require('./subRoutes/admin')
const teacher = require('./subRoutes/teacher')
const student = require('./subRoutes/student')
const { getUserInfo } = require('../controller/getInfo')
const { getCourse } = require('../controller/course')


/* 
   一级 path
*/

// 验证登录
router.use('/', (req, res, next) => {
  if (/^(\/login)/i.test(req.url)) {
    return next()
  }
  if (!req.session.userId || !req.session.auth) {
    if (/^(\/logout)/i.test(req.url)) {
      return res.send({
        code: 3,
        msg: '登出失败'
      })
    }
    return res.status(401).send({ messgae: "未登录" })
  } else
    next()
})

// 登录 ， 登出
router.use('/', Login)
// 获取用户信息
router.get('/get-info', getUserInfo)
// 获取课程
router.get('/get-course', getCourse)

/* 
   二级
*/

// 权限验证
router.use('/stu', (req, res, next) => {
  if (req.session.auth !== 'student') {
    return res.send({
      code: 2,
      msg: "无权限"
    })
  } else {
    next()
  }
})

router.use('/tea', (req, res, next) => {
  if (req.session.auth !== 'teacher') {
    return res.send({
      code: 2,
      msg: "无权限"
    })
  } else {
    next()
  }
})

router.use('/admin', (req, res, next) => {
  if (req.session.auth !== 'admin') {
    return res.send({
      code: 2,
      msg: "无权限"
    })
  } else {
    next()
  }
})

// 权限允许后
router.use('/admin', admin)
router.use('/tea', teacher)
router.use('/stu', student)

module.exports = router