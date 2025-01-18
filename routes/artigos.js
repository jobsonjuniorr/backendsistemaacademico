const express = require('express');
const multer = require('multer');
const router = express.Router();
const db = require('../db/db');

// Configuração do multer para salvar arquivos na memória
const upload = multer({ storage: multer.memoryStorage() });

// Rota para adicionar um artigo
router.post('/', upload.single('pdfFile'), async (req, res) => {
    const { title, authors, summary } = req.body;

    if (!title || !authors || !summary || !req.file) {
        return res.status(400).json({
            message: 'Os campos título, autores, resumo e o arquivo PDF são obrigatórios.',
        });
    }

    try {
        // Inserção dos dados no banco de dados
        const [result] = await db.query(
            `INSERT INTO artigos (titulo, autores, resumo, arquivo_pdf_path) VALUES (?, ?, ?, ?)`,
            [
                title,
                authors,
                summary,
                req.file.buffer, // Conteúdo do arquivo armazenado como LONGBLOB
            ]
        );

        res.status(201).json({
            message: 'Artigo salvo com sucesso!',
            id: result.insertId,
        });
    } catch (error) {
        console.error('Erro ao inserir no banco de dados:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

// Rota para listar artigos
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM artigos');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao recuperar os artigos:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

module.exports = router;
