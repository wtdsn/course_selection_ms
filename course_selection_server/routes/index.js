const router = require('express').Router()

const Login = require('./login')


/* 
   一级 path
*/
router.use('/', (req, res, next) => {
  if (/^(\/login)/i.test(req.url)) {
    return next()
  }
  if (!req.session.userId) {
    if (/^(\/logout)/i.test(req.url)) {
      return res.send({
        code: 2,
        messgae: '登出失败'
      })
    }
    return res.status(403).send({ messgae: "未登录" })
  } else
    next()
})

// 登录 ， 登出
router.use('/', Login)


/* 
   包括二级
*/


module.exports = router