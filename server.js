const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require('./routes/login.js');
const cadastroRoutes = require('./routes/cadastroRoutes.js')
const conteudoRoutes = require('./routes/conteudoRoutes.js');
const app = express();
const PORT = 3000;


app.use(cors());
app.use(bodyParser.json());


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const formularioRoutes = require('./routes/conteudoRoutes.js');

const artigos = require('./routes/artigos')
const noticias = require('./routes/noticias')

app.use('/api/formulario', formularioRoutes);
app.use('/api/noticias', noticias)
app.use('/api/artigos', artigos);

app.use('/auth', authRoutes);
app.use('/cadastro', cadastroRoutes);
app.use('/conteudo', conteudoRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
