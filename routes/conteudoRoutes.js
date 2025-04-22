const express = require('express');
const multer = require('multer');
const router = express.Router();
const ConteudoController = require('../controllers/conteudoController');

const upload = multer({ dest: 'uploads/' });

router.post(
    '/',
    upload.fields([{ name: 'image' }, { name: 'logo' }, { name: 'secondImage' }]),
    ConteudoController.criar
);

router.get('/', ConteudoController.listar);

module.exports = router;
