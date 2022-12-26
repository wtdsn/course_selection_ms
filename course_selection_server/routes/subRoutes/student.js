const router = require('express').Router()
const { getSelections, addSelections, delSelection } = require('../../controller/selection')

router.get('/get-selections', getSelections)
router.post('/add-selection', addSelections)
router.post('/del-selection', delSelection)

module.exports = router