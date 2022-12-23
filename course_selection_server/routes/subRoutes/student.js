const router = require('express').Router()
const { getSelections, addSelections, delSelection } = require('../../controller/selection')

router.get('/get-selections', getSelections)
router.post('/add-selections', addSelections)
router.post('/del-selections', delSelection)

module.exports = router