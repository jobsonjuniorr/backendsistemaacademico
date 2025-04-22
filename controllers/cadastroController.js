const CadastroModel = require('../models/cadastroModel.js');

const criar = async (req, res) => {
    const { nome, cpf, email, celular, categoria, eventos, valorTotal } = req.body;

    if (!nome || !cpf || !email || !celular || !categoria || !eventos || !valorTotal) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    try {
        const id = await CadastroModel.criarCadastro(nome, cpf, email, celular, categoria, eventos, valorTotal);

        res.status(201).json({
            message: 'Cadastro realizado com sucesso!',
            id: id
        });
    } catch (error) {
        console.error('Erro ao inserir no banco de dados:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

module.exports = {
    criar
};
