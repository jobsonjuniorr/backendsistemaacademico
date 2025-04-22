const db = require('../db/db');

const findUserByEmailAndPassword = async (email, senha) => {
    const [rows] = await db.query(
        'SELECT * FROM usuarios WHERE email = ? AND senha = ?',
        [email, senha]
    );
    return rows;
};

module.exports = {
    findUserByEmailAndPassword,
};
