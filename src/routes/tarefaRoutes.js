const express = require('express');
const TarefaController = require('../controllers/TarefaController');

const router = express.Router();

router.get('/', (req, res) => res.redirect('/tarefas'));

router.get('/tarefas', TarefaController.listar);
router.get('/tarefas/nova', TarefaController.formularioCadastro);
router.post('/tarefas', TarefaController.cadastrar);

router.get('/tarefas/:id', TarefaController.detalhes);
router.get('/tarefas/:id/editar', TarefaController.formularioEdicao);
router.put('/tarefas/:id', TarefaController.editar);

router.post('/tarefas/:id/concluir', TarefaController.concluir);

router.get('/tarefas/:id/excluir', TarefaController.confirmarExclusao);
router.delete('/tarefas/:id', TarefaController.excluir);

module.exports = router;
