const userDocsController = require('../controllers/userDocs.controller');

const express = require('express');
const { authenticateToken } = require('../middlewares/auth');

const router = express.Router();

router.post('/create', authenticateToken, userDocsController.create)
router.put('/update', authenticateToken, userDocsController.update)
router.get('/list', authenticateToken, userDocsController.find)
router.get('/find', authenticateToken, userDocsController.findById)

module.exports = router;