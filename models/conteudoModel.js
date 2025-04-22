const db = require('../db/db');

const criarConteudo = async (title, description, secondText, imagePath, logoPath, secondImagePath) => {
    const [result] = await db.query(
        `INSERT INTO conteudo (title, description, second_text, image_path, logo_path, second_image_path) VALUES (?, ?, ?, ?, ?, ?)`,
        [title, description, secondText, imagePath, logoPath, secondImagePath]
    );
    return result.insertId;
};

const listarConteudos = async () => {
    const [rows] = await db.query('SELECT * FROM conteudo');
    return rows;
};

module.exports = {
    criarConteudo,
    listarConteudos
};
