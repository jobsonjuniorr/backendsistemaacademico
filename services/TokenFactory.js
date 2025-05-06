const jwt = require('jsonwebtoken');
const JWT_SECRET = '29921993193192';

class TokenFactory {
    static generate(user) {
        return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    }

    static verify(token) {
        return jwt.verify(token, JWT_SECRET);
    }
}

module.exports = TokenFactory;
