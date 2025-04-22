const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController.js');

router.post('/', AuthController.login);
router.get('/admin', AuthController.verificarToken, AuthController.admin);

module.exports = router;
