const { queryAsync } = require('../db/index.js')

// 查询我的选课
async function getSelections(req, res) {
  const { userId } = req.session
  const query = `SELECT
  s.id,
  c.name,c.courseId,c.credit,c.creditHours,c.introduce,c.teacherId,c.place,c.time,c.stuNum,
  t.name AS teacherName
  FROM selections AS s, courses AS c, teachers AS t
  WHERE s.stuId=${userId} AND s.cId=c.courseId AND c.teacherId=t.userId
  `
  const { code, data } = await queryAsync(query)
  if (!code) {
    return res.send({
      code: 2,
      msg: "数据库查找失败"
    })
  }

  res.send({
    code: 1,
    msg: "查询成功",
    data: data
  })
}

// 添加我的选课
async function addSelections(req, res) {
  const { courseId } = req.body
  const { userId } = req.session

  // 是否可选判断
  const { code: code1, data: data1 } = await queryAsync(
    `SELECT mys.myNum , c.stuNum ,alls.allNum FROM
    (SELECT COUNT(*) myNum FROM selections WHERE stuId=${userId}) mys,
    (SELECT stuNum FROM courses WHERE courseId=${courseId}) c,
    (SELECT COUNT(*) allNum FROM selections WHERE cId=${courseId}) alls
  `)

  if (!code1 || data1.length === 0) {
    return res.send({
      code: 2,
      msg: "操作失败"
    })
  }

  const { myNum, stuNum, allNum } = data1[0]

  if (myNum >= 4) {
    return res.send({
      code: 2,
      msg: "最多选择4个课程"
    })
  }

  if (allNum >= stuNum) {
    return res.send({
      code: 2,
      msg: "该课程人数已满"
    })
  }

  const query = `INSERT INTO selections (id, stuId, cId) VALUES (NULL, '${userId}', '${courseId}')`
  const { code, data } = await queryAsync(query)

  if (!code || data.affectedRows === 0) {
    return res.send({
      code: 2,
      msg: "操作失败"
    })
  }

  res.send({
    code: 1,
    msg: "添加成功"
  })
}

// 删除我的选课
async function delSelection(req, res) {
  const { id } = req.body
  const { userId } = req.session

  const query = `DELETE FROM selections WHERE id=${id} AND stuId=${userId}`
  const { code, data } = await queryAsync(query)

  if (!code || data.affectedRows === 0) {
    return res.send({
      code: 2,
      msg: "取消失败"
    })
  }

  res.send({
    code: 1,
    msg: "取消成功"
  })
}

module.exports = {
  getSelections,
  addSelections,
  delSelection
}