const router = require('express').Router()
const { addCourse, delCourse, updateCourse } = require('../../controller/course')


router.post('/add-course', addCourse)
router.post('/del-course', delCourse)
router.post('/update-course', updateCourse)

module.exports = router