const Noticia = require('../models/noticiaModel');

exports.criar = async (req, res) => {
    const { tilleNoticia, descriptionNoticia } = req.body;

    if (!tilleNoticia || !descriptionNoticia) {
        return res.status(400).json({ message: 'Os campos título e descrição são obrigatórios.' });
    }

    try {
        const imagemPath = req.file ? req.file.path : null;
        const insertId = await Noticia.criarNoticia(tilleNoticia, descriptionNoticia, imagemPath);

        res.status(201).json({
            message: 'Notícia cadastrada com sucesso!',
            id: insertId,
        });
    } catch (error) {
        console.error('Erro ao inserir a notícia no banco de dados:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

exports.listar = async (req, res) => {
    try {
        const noticias = await Noticia.listarNoticias();
        res.status(200).json(noticias);
    } catch (error) {
        console.error('Erro ao recuperar as notícias:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};
