const { queryAsync } = require('../db/index.js')

async function getUserInfo(req, res) {
  const { auth, userId } = req.session

  const query = `SELECT * FROM ${auth}s WHERE userId=${userId}`

  const { code, data = [] } = await queryAsync(query)
  if (code === 0 || data.length === 0) {
    return res.status(401).send({ message: "登录超时" })
  }

  delete data[0].pw

  return res.send({
    code: 1,
    msg: "获取成功",
    data: data[0]
  })
}

module.exports = {
  getUserInfo
}