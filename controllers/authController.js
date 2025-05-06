const EmailPasswordStrategy = require('../strategies/EmailPasswordStrategy');
const AuthService = require('../services/AuthService');

const authService = new AuthService(new EmailPasswordStrategy());

const login = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ message: 'Por favor, preencha todos os campos.' });
    }

    try {
        const result = await authService.login(email, senha);
        res.status(200).json(result);
    } catch (error) {
        if (error.message === 'INVALID_CREDENTIALS') {
            return res.status(401).json({ message: 'E-mail ou senha incorretos.' });
        }
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

const verificarToken = (req, res, next) => {
    try {
        const decoded = authService.verifyToken(req.headers['authorization']);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.message === 'TOKEN_NOT_PROVIDED') {
            return res.status(403).json({ message: 'Acesso proibido. Token não fornecido.' });
        }
        return res.status(403).json({ message: 'Token inválido.' });
    }
};

const admin = (req, res) => {
    res.status(200).json({ message: 'Bem-vindo à área de administração!', user: req.user });
};

module.exports = {
    login,
    verificarToken,
    admin
};
