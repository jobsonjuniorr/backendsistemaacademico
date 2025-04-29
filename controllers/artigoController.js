const Artigo = require('../models/artigosModel');

exports.criar = async (req, res) => {
    const { title, authors, summary } = req.body;

    if (!title || !authors || !summary || !req.file) {
        return res.status(400).json({
            message: 'Os campos título, autores, resumo e o arquivo PDF são obrigatórios.',
        });
    }

    try {
        const insertId = await Artigo.criarArtigo(title, authors, summary, req.file.buffer);
        res.status(201).json({ message: 'Artigo salvo com sucesso!', id: insertId });
    } catch (error) {
        console.error('Erro ao inserir no banco de dados:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

exports.obterPDF = async (req, res) => {
    const id = req.params.id;
    try {
        const artigo = await Artigo.buscarArtigoPorId(id);

        if (!artigo) {
            return res.status(404).json({ message: 'Artigo não encontrado' });
        }

        res.setHeader('Content-Type', 'application/pdf');
        res.send(artigo.arquivo_pdf_path);
    } catch (error) {
        console.error('Erro ao recuperar o PDF:', error);
        res.status(500).json({ message: 'Erro ao recuperar o PDF.' });
    }
};

exports.listar = async (req, res) => {
    try {
        const artigos = await Artigo.listarArtigos();
        res.status(200).json(artigos);
    } catch (error) {
        console.error('Erro ao recuperar os artigos:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};
