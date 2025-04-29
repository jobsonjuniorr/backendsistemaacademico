const db = require('../db/db');

const Noticia = {
    async criarNoticia(titulo, descricao, imagemPath) {
        const [result] = await db.query(
            `INSERT INTO noticias (title_noticia, description_noticia, noticia_image_path) VALUES (?, ?, ?)`,
            [titulo, descricao, imagemPath]
        );
        return result.insertId;
    },

    async listarNoticias() {
        const [rows] = await db.query('SELECT * FROM noticias');
        return rows;
    }
};

module.exports = Noticia;
