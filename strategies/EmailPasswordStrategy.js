const UserModel = require('../models/userModel');

class EmailPasswordStrategy {
    async authenticate(email, senha) {
        const users = await UserModel.findUserByEmailAndPassword(email, senha);
        return users.length > 0 ? users[0] : null;
    }
}

module.exports = EmailPasswordStrategy;
