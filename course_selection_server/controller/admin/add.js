const { queryAsync } = require('../../db/index.js')
const { checkValid } = require('../../utils/shared')

// 添加学生
async function addStudent(req, res) {
  const { name, number, gender, majorClass = '', school = '', session } = req.body
  // 必须字段
  // name,number,gender , session
  // pw = number
  if (!(checkValid(name) && checkValid(number) && checkValid(gender) && checkValid(session))) {
    return res.send({
      code: 2,
      msg: "请填写必填数据"
    })
  }

  const query = `INSERT INTO students 
  (name, number, gender, majorClass, school, session, userId, pw) VALUES 
  ('${name}', '${number}', '${gender}', '${majorClass}', '${school}', '${session}', NULL, '${number}');`

  let returnV = await queryHandler(query, '学号已存在')
  return res.send(returnV)
}

// 添加老师
async function addTeacher(req, res) {
  const { name, number, gender } = req.body
  if (!(checkValid(name) && checkValid(number) && checkValid(gender))) {
    return res.send({
      code: 2,
      msg: "请填写必填数据"
    })
  }

  const query = `INSERT INTO teachers 
  (name, number, gender, userId, pw) VALUES 
  ('${name}', '${number}', '${gender}', NULL, '${number}');`

  let returnV = await queryHandler(query, '工号已存在')
  return res.send(returnV)
}

// 再封装，抽离公共部分
async function queryHandler(query, dupText) {
  const result = await queryAsync(query)

  if (result.code === 0) {
    if (result.err.code === 'ER_DUP_ENTRY') {
      return {
        code: 2,
        msg: dupText
      }
    }
    return {
      code: 2,
      msg: "添加失败"
    }
  }
  return {
    code: 1,
    msg: "添加成功"
  }
}

module.exports = {
  addStudent,
  addTeacher
}