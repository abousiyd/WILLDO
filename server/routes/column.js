const express = require('express');
const router = express.Router();
const {create, list, deletecolumn, edit} = require('../controllers/column');
const authUser = require('../middleware/authUser');

router.post('/create',authUser, create)
router.get('/:id',authUser, list)
router.delete('/:id',authUser, deletecolumn)
router.put('/:id',authUser, edit);




module.exports = router;