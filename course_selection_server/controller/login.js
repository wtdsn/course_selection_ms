const { queryAsync } = require('../db/index.js')

async function login(req, res) {
  let { number, pw, auth } = req.body

  if (!number || !pw || (auth !== 'student' && auth !== 'teacher' && auth !== 'admin')) {
    return res.send({
      code: 2,
      msg: "参数错误"
    })
  }

  const result = await queryAsync(`SELECT * FROM ${auth.toLowerCase()}s 
  WHERE number='${number}' AND pw='${pw}'`)

  if (result.code === 0) {
    res.status(500).send({ message: "查询报错" })
    return
  }
  if (result.data.length) {
    let data = { ...result.data[0] }
    delete data.pw
    req.session.userId = data.userId
    req.session.auth = auth
    res.send({
      code: 1,
      msg: "登录成功",
      data: data
    })

  } else {
    res.send({
      code: 2,
      msg: "账号或密码错误"
    })
  }
}


function logout(req, res) {
  req.session.userId = undefined
  req.session.auth = undefined
  res.send({
    code: 1,
    msg: "登出成功"
  })
}


module.exports = {
  login,
  logout
}