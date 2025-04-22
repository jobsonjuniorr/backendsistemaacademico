const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

const JWT_SECRET = 'seu_segredo_aqui';

const login = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ message: 'Por favor, preencha todos os campos.' });
    }

    try {
        const users = await UserModel.findUserByEmailAndPassword(email, senha);

        if (users.length === 0) {
            return res.status(401).json({ message: 'E-mail ou senha incorretos.' });
        }

        const token = jwt.sign({ id: users[0].id, email: users[0].email }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login realizado com sucesso.', token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

const verificarToken = (req, res, next) => {
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
};

const admin = (req, res) => {
    res.status(200).json({ message: 'Bem-vindo à área de administração!', user: req.user });
};

module.exports = {
    login,
    verificarToken,
    admin
};
