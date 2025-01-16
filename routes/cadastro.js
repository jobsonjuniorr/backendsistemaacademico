const express = require('express');
const router = express.Router();
const db = require('../db/db');

router.post('/', async (req, res) => {
    const { nome, cpf, email, celular, categoria, eventos, valorTotal } = req.body;

    if (!nome || !cpf || !email || !celular || !categoria || !eventos || !valorTotal) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    try {
        // Convertendo eventos para string JSON para salvar no banco
        const eventosString = JSON.stringify(eventos);

        // Inserir no banco de dados
        const [result] = await db.query(
            `INSERT INTO cadastros (nome, cpf, email, celular, categoria, eventos, valor_total) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [nome, cpf, email, celular, categoria, eventosString, parseFloat(valorTotal.replace('R$', '').trim())]
        );

        res.status(201).json({
            message: 'Cadastro realizado com sucesso!',
            id: result.insertId
        });
    } catch (error) {
        console.error('Erro ao inserir no banco de dados:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

module.exports = router;
