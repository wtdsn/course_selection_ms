const { queryAsync } = require('../../db/index.js')
const { checkValid } = require('../../utils/shared')

async function search(req, res) {
  const { type, condition, matchText } = req.query

  console.log(type, condition, matchText);
  // 非法验证
  if (type !== 'student' && type !== 'teacher') {
    return res.send({
      code: 2,
      msg: "参数有误！"
    })
  }
  if (!['all', 'name', 'number', 'session'].includes(condition)) {
    return res.send({
      code: 2,
      msg: "参数有误！"
    })
  }
  if (condition !== 'all' && !checkValid(matchText)) {
    return res.send({
      code: 2,
      msg: "参数有误！"
    })
  }

  let query
  if (type === 'student') {
    query = `SELECT name,number,gender,majorClass,school, session FROM students`
  } else {
    query = `SELECT name, number, gender FROM teachers`
  }

  if (condition !== 'all') {
    query += `  WHERE ${condition} LIKE '%${matchText}%'`
  }

  const result = await queryAsync(query)
  if (result.code === 0) {
    return res.send({
      code: 2,
      msg: "查询失败"
    })
  }

  return res.send({
    code: 1,
    msg: "查询成功",
    data: result.data
  })
}

module.exports = {
  search
}