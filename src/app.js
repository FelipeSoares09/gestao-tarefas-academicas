const path = require('path');
const express = require('express');
const methodOverride = require('method-override');
const tarefaRoutes = require('./routes/tarefaRoutes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use((req, res, next) => {
  res.locals.mensagem = null;
  res.locals.erro = null;
  next();
});

app.use('/', tarefaRoutes);

app.use((req, res) => {
  res.status(404).render('erro', {
    tituloPagina: 'Página não encontrada',
    mensagem: 'A página solicitada não existe.',
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('erro', {
    tituloPagina: 'Erro interno',
    mensagem: 'Ocorreu um erro inesperado no servidor.',
  });
});

module.exports = app;
