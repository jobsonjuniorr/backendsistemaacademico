const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const authRoutes = require('./routes/login');
const cadastroRoutes = require('./routes/cadastroRoutes');
const conteudoRoutes = require('./routes/conteudoRoutes');
const artigoRoutes = require('./routes/artigos');
const noticiaRoutes = require('./routes/noticias');

app.use('/auth', authRoutes);
app.use('/cadastro', cadastroRoutes);
app.use('/conteudo', conteudoRoutes);
app.use('/api/artigos', artigoRoutes);
app.use('/api/noticias', noticiaRoutes);


app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
