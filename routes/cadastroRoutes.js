const express = require('express');
const router = express.Router();
const CadastroController = require('../controllers/cadastroController');

router.post('/', CadastroController.criar);

module.exports = router;
