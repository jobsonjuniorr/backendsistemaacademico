const express = require('express');
const router = express.Router();
const db = require('../db/db');

router.post('/', async (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) {
        return res.status(400).json({ message: 'Por favor, preencha todos os campos.' });
    }
    try {
        const [rows] = await db.query(
            'SELECT * FROM usuarios WHERE email = ? AND senha = ?',
            [email, senha]
        );
        if (rows.length > 0) {
            res.status(200).json({ message: 'Login realizado com sucesso.', user: rows[0] });
        } else {
            res.status(401).json({ message: 'E-mail ou senha incorretos.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});


module.exports = router;
