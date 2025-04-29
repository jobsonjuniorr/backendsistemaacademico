const express = require('express');
const router = express.Router();
const multer = require('multer');
const noticiaController = require('../controllers/noticiaController');

const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('noticiaImage'), noticiaController.criar);
router.get('/', noticiaController.listar);

module.exports = router;
