const ConteudoModel = require('../models/conteudoModel');

const criar = async (req, res) => {
    const { title, description, secondText } = req.body;

    if (!title || !description || !secondText) {
        return res.status(400).json({ message: 'Os campos title, description e secondText são obrigatórios.' });
    }

    try {
        const imagePath = req.files['image'] ? req.files['image'][0].path : null;
        const logoPath = req.files['logo'] ? req.files['logo'][0].path : null;
        const secondImagePath = req.files['secondImage'] ? req.files['secondImage'][0].path : null;

        const id = await ConteudoModel.criarConteudo(title, description, secondText, imagePath, logoPath, secondImagePath);

        res.status(201).json({
            message: 'Dados do formulário salvos com sucesso!',
            id
        });
    } catch (error) {
        console.error('Erro ao inserir no banco de dados:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

const listar = async (req, res) => {
    try {
        const conteudos = await ConteudoModel.listarConteudos();
        res.status(200).json(conteudos);
    } catch (error) {
        console.error('Erro ao recuperar os dados:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

module.exports = {
    criar,
    listar
};
