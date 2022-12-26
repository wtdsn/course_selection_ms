const { queryAsync } = require('../db/index.js')
const { checkValid } = require('../utils/shared')

// 查看课，老师可以查看自己的和全部的
// 学生查看全部的
async function getCourse(req, res) {
  // 数据读取
  const { auth, userId } = req.session
  const { size, page, self } = req.query

  // 查全部
  if (auth === 'student' || !self) {
    // 查询总数量
    const { code, data } = await queryAsync(`SELECT COUNT(*) FROM courses`)
    if (!code) {
      return res.send({
        code: 2,
        msg: "查询失败"
      })
    }
    let total = data[0]['COUNT(*)'], courses = []
    if (total) {
      const query = `SELECT c.name,c.courseId,c.credit,c.creditHours,c.introduce,
      c.teacherId,c.place,c.time,c.stuNum,t.name as teacherName,count(s.id) as curNum
     FROM
      courses c
     LEFT JOIN selections s
     ON  s.cId = c.courseId
     LEFT JOIN teachers t
     ON c.teacherId = t.userId
     group by courseId
     LIMIT ${size * (page - 1)},${size}`

      // 查课程
      const { code, data } = await queryAsync(query)
      if (!code) {
        return res.send({
          code: 2,
          msg: "查询失败"
        })
      }
      courses = data
    }
    res.send({
      code: 1,
      msg: "查询成功",
      data: {
        total,
        courses
      }
    })
  } else if (self) {
    // 查自己的课程
    const query = `SELECT c.name, c.courseId,  c.credit, c.creditHours,c.introduce,c.teacherId,
    c.place,c.time, c.stuNum,t.name as teacherName,count(s.id) as curNum
   FROM courses c
   LEFT JOIN selections s
   ON s.cId = c.courseId
   LEFT JOIN  teachers t
   ON  c.teacherId = t.userId
   WHERE
   c.teacherId = ${userId}
   group by courseId`
    let { code, data = [] } = await queryAsync(query)

    if (!code) {
      return res.send({
        code: 2,
        msg: "查询失败"
      })
    }
    res.send({
      code: 1,
      msg: "查询成功",
      data: data
    })
  } else {
    return res.send({
      code: 2,
      msg: "参数错误"
    })
  }
}

// 增加课程
async function addCourse(req, res) {
  const {
    name, credit, creditHours,
    introduce = '', place = '', time = '', stuNum
  } = req.body
  const { userId } = req.session

  if (!(checkValid(name) && checkValid(credit) && checkValid(creditHours) && checkValid(stuNum))) {
    return res.send({
      code: 2,
      msg: "参数错误"
    })
  }

  const query = `INSERT INTO courses
   (name, courseId, credit, creditHours, introduce, teacherId, place, time, stuNum) 
   VALUES
   ('${name}', NULL, '${credit}', '${creditHours}', '${introduce}', '${userId}', '${place}', '${time}', '${stuNum}')`

  const { code, data } = await queryAsync(query)
  if (!code) {
    return res.send({
      code: 2,
      msg: "添加失败"
    })
  }
  res.send({
    code: 1,
    msg: '添加成功'
  })
}

// 删除课程 => 删除选课信息
async function delCourse(req, res) {
  const { courseId } = req.body
  const { userId } = req.session

  const query = `DELETE FROM courses WHERE courseId=${courseId} AND teacherId=${userId}`
  const { code, data } = await queryAsync(query)
  if (!code) {
    return res.send({
      code: 2,
      msg: "数据库操作失败"
    })
  }

  if (data.affectedRows) {
    res.send({
      code: 1,
      msg: "删除成功"
    })

    // 删除选课记录
    queryAsync(`DELETE FROM selections WHERE cId=${courseId}`)
  } else {
    res.send({
      code: 2,
      msg: "删除失败"
    })
  }
}

// 修改课程 =》 不需要修改选课信息
async function updateCourse(req, res) {
  const {
    name, credit, creditHours,
    introduce = '', place = '', time = '', stuNum, courseId
  } = req.body
  const { userId } = req.session

  if (!checkValid(courseId)) {
    return res.send({
      code: 2,
      msg: "参数错误"
    })
  }
  const query = `UPDATE courses
  SET name='${name}', credit='${credit}', creditHours='${creditHours}', 
  introduce='${introduce}', place='${place}', time='${time}', stuNum='${stuNum}'
  WHERE courseId=${courseId} AND teacherId=${userId}
  `
  const { code, data } = await queryAsync(query)
  if (!code) {
    return res.send({
      code: 2,
      msg: "数据库操作失败"
    })
  }

  if (data.affectedRows) {
    res.send({
      code: 1,
      msg: "修改成功"
    })
  } else {
    res.send({
      code: 2,
      msg: "修改失败"
    })
  }
}

module.exports = {
  getCourse,
  addCourse,
  delCourse,
  updateCourse
}
