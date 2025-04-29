const db = require('../db/db.js');

const Artigo = {
    async criarArtigo(titulo, autores, resumo, pdfBuffer) {
        const [result] = await db.query(
            `INSERT INTO artigos (titulo, autores, resumo, arquivo_pdf_path) VALUES (?, ?, ?, ?)`,
            [titulo, autores, resumo, pdfBuffer]
        );
        return result.insertId;
    },

    async buscarArtigoPorId(id) {
        const [rows] = await db.query('SELECT * FROM artigos WHERE id = ?', [id]);
        return rows[0];
    },

    async listarArtigos() {
        const [rows] = await db.query('SELECT * FROM artigos ORDER BY created_at DESC');
        return rows;
    }
};

module.exports = Artigo;
