const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); // Importando o módulo path

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configurar o Express para servir arquivos estáticos da pasta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rotas
const cadastroRoutes = require('./routes/cadastro');
const formularioRoutes = require('./routes/formulario'); // Nova rota

app.use('/api/cadastro', cadastroRoutes);
app.use('/api/formulario', formularioRoutes); // Registrando a nova rota

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
