const TokenFactory = require('./TokenFactory');

class AuthService {
    constructor(authStrategy) {
        this.authStrategy = authStrategy;
    }

    async login(email, senha) {
        const user = await this.authStrategy.authenticate(email, senha);
        if (!user) throw new Error('INVALID_CREDENTIALS');
        const token = TokenFactory.generate(user);
        return { message: 'Login realizado com sucesso.', token };
    }

    verifyToken(authorizationHeader) {
        if (!authorizationHeader) throw new Error('TOKEN_NOT_PROVIDED');

        const token = authorizationHeader.split(' ')[1];
        if (!token) throw new Error('TOKEN_NOT_PROVIDED');

        return TokenFactory.verify(token);
    }
}

module.exports = AuthService;
