const express = require('express');
const multer = require('multer');
const router = express.Router();
const db = require('../db/db');

// Configuração do multer para salvar os arquivos em uma pasta "uploads"
const upload = multer({ dest: 'uploads/' });

// Rota para salvar as informações e as imagens
router.post('/', upload.fields([{ name: 'image' }, { name: 'logo' }, { name: 'secondImage' }, {name : 'noticiaImage'}]), async (req, res) => {
    const { title, description, secondText, tilleNoticia, descriptionNoticia } = req.body;
    console.log(tilleNoticia)
  
    if (!title || !description || !secondText || !tilleNoticia || !descriptionNoticia) {
        return res.status(400).json({ message: 'Os campos title, description e secondText são obrigatórios.' });
    }

    try {
        const [result] = await db.query(
            `INSERT INTO conteudo (title, description, second_text, title_noticia, description_noticia, image_path, logo_path, second_image_path, noticia_image_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)`,
            [
                title,
                description,
                secondText,
                tilleNoticia,
                descriptionNoticia,
                req.files['image'] ? req.files['image'][0].path : null,
                req.files['logo'] ? req.files['logo'][0].path : null,
                req.files['secondImage'] ? req.files['secondImage'][0].path : null,
                req.files['noticiaImage'] ? req.files['noticiaImage'][0].path : null
            ]
        );

        res.status(201).json({
            message: 'Dados do formulário salvos com sucesso!',
            id: result.insertId,
        });
    } catch (error) {
        console.error('Erro ao inserir no banco de dados:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});


router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM conteudo');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao recuperar os dados:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

module.exports = router;
