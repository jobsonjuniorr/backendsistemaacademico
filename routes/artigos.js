const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const db = require('../db/db');


const upload = multer({ storage: multer.memoryStorage() });


router.post('/', upload.single('pdfFile'), async (req, res) => {
    const { title, authors, summary } = req.body;

    if (!title || !authors || !summary || !req.file) {
        return res.status(400).json({
            message: 'Os campos título, autores, resumo e o arquivo PDF são obrigatórios.',
        });
    }

    try {
    
        const [result] = await db.query(
            `INSERT INTO artigos (titulo, autores, resumo, arquivo_pdf_path) VALUES (?, ?, ?, ?)`,
            [
                title,
                authors,
                summary,
                req.file.buffer, 
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

router.get('/:id/pdf', async (req, res) => {
    const artigoId = req.params.id;
    try {
        
        const [rows] = await db.query('SELECT * FROM artigos WHERE id = ?', [artigoId]);
        
     
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Artigo não encontrado' });
        }
        
        const artigo = rows[0];
     
        res.setHeader('Content-Type', 'application/pdf');
        
        
        res.send(artigo.arquivo_pdf_path); 
    } catch (error) {
        console.error('Erro ao recuperar o PDF:', error);
        res.status(500).json({ message: 'Erro ao recuperar o PDF.' });
    }
});



router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM artigos ORDER BY created_at DESC');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao recuperar os artigos:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});
module.exports = router;
