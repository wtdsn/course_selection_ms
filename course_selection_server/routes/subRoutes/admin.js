const router = require('express').Router()
const { addStudent, addTeacher } = require('../../controller/admin/add')
const { search } = require('../../controller/admin/search')

// 添加学生
router.post('/add-stu', addStudent)
router.post('/add-tea', addTeacher)

// 查询
router.get('/search', search)


module.exports = router