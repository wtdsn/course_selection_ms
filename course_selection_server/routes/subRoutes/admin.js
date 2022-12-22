const router = require('express').Router()
const { addStudent, addTeacher } = require('../../controller/admin/add')

// 添加学生
router.post('/add-stu', addStudent)
router.post('/add-tea', addTeacher)


module.exports = router