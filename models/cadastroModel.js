const db = require('../db/db');

const criarCadastro = async (nome, cpf, email, celular, categoria, eventos, valorTotal) => {
    const eventosString = JSON.stringify(eventos);

    const [result] = await db.query(
        `INSERT INTO cadastros (nome, cpf, email, celular, categoria, eventos, valor_total) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [nome, cpf, email, celular, categoria, eventosString, parseFloat(valorTotal.replace('R$', '').trim())]
    );

    return result.insertId;
};

module.exports = {
    criarCadastro
};
