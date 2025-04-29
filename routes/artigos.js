const express = require('express');
const router = express.Router();
const multer = require('multer');
const artigoController = require('../controllers/artigoController');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('pdfFile'), artigoController.criar);
router.get('/:id/pdf', artigoController.obterPDF);
router.get('/', artigoController.listar);

module.exports = router;
