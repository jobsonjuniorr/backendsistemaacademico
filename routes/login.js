const express = require('express');
const router = express.Router();
const db = require('../db/db');
const jwt = require('jsonwebtoken');


const JWT_SECRET = 'seu_segredo_aqui';

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

        if (rows.length === 0) {
            return res.status(401).json({ message: 'E-mail ou senha incorretos.' });
        }

  
        const token = jwt.sign({ id: rows[0].id, email: rows[0].email }, JWT_SECRET, { expiresIn: '1h' });

       
        res.status(200).json({ message: 'Login realizado com sucesso.', token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});
function verificarToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Acesso proibido. Token não fornecido.' });
    }

    const tokenSemBearer = token.split(' ')[1];
    
    if (!tokenSemBearer) {
        return res.status(403).json({ message: 'Acesso proibido. Token não fornecido.' });
    }

   

    jwt.verify(tokenSemBearer, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido.' });
        }

        req.user = decoded;
        next();
    });
}

router.get('/admin', verificarToken, (req, res) => {
    res.status(200).json({ message: 'Bem-vindo à área de administração!', user: req.user });
});

module.exports = router;
