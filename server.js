const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;


app.use(cors());
app.use(bodyParser.json());


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const cadastroRoutes = require('./routes/cadastro');
const formularioRoutes = require('./routes/formulario');
const loginRoutes = require('./routes/login');
const artigos = require('./routes/artigos')
const noticias = require('./routes/noticias')

app.use('/api/cadastro', cadastroRoutes);
app.use('/api/formulario', formularioRoutes);
app.use('/api/noticias', noticias)
app.use('/api/login', loginRoutes); 
app.use('/api/artigos', artigos);


app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
