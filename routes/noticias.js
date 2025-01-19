const express = require('express');
const multer = require('multer');
const router = express.Router();
const db = require('../db/db');


const upload = multer({ dest: 'uploads/' });


router.post('/', upload.single('noticiaImage'), async (req, res) => {
    const { tilleNoticia, descriptionNoticia } = req.body;
    

    if (!tilleNoticia || !descriptionNoticia) {
        return res.status(400).json({ message: 'Os campos título e descrição são obrigatórios.' });
    }

    try {
        const [result] = await db.query(
            `INSERT INTO noticias (title_noticia, description_noticia, noticia_image_path) VALUES (?, ?, ?)`,
            [
                tilleNoticia,
                descriptionNoticia,
                req.file ? req.file.path : null,
            ]
        );

        res.status(201).json({
            message: 'Notícia cadastrada com sucesso!',
            id: result.insertId,
        });
    } catch (error) {
        console.error('Erro ao inserir a notícia no banco de dados:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM noticias');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao recuperar as notícias:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

module.exports = router;
