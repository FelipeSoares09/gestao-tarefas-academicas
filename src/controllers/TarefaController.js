const Tarefa = require('../models/Tarefa');

/**
 * Controller: processa requisições HTTP e decide o que o Model e a View fazem.
 */
const TarefaController = {
  listar(req, res) {
    const filtro = req.query.status || 'todas';
    const tarefas = Tarefa.listar(filtro);

    res.render('tarefas/index', {
      tituloPagina: 'Tarefas acadêmicas',
      tarefas,
      filtro,
      mensagem: req.query.mensagem || null,
      erro: req.query.erro || null,
    });
  },

  formularioCadastro(req, res) {
    res.render('tarefas/form', {
      tituloPagina: 'Cadastrar tarefa',
      acao: '/tarefas',
      metodo: 'POST',
      tarefa: { titulo: '', descricao: '', disciplina: '' },
      erros: [],
    });
  },

  cadastrar(req, res) {
    const resultado = Tarefa.criar(req.body);

    if (!resultado.sucesso) {
      return res.status(400).render('tarefas/form', {
        tituloPagina: 'Cadastrar tarefa',
        acao: '/tarefas',
        metodo: 'POST',
        tarefa: req.body,
        erros: resultado.erros,
      });
    }

    return res.redirect('/tarefas?mensagem=Tarefa cadastrada com sucesso.');
  },

  detalhes(req, res) {
    const tarefa = Tarefa.buscarPorId(req.params.id);

    if (!tarefa) {
      return res.status(404).render('erro', {
        tituloPagina: 'Tarefa não encontrada',
        mensagem: 'Não foi possível localizar a tarefa solicitada.',
      });
    }

    return res.render('tarefas/detalhes', {
      tituloPagina: 'Detalhes da tarefa',
      tarefa,
      mensagem: req.query.mensagem || null,
    });
  },

  formularioEdicao(req, res) {
    const tarefa = Tarefa.buscarPorId(req.params.id);

    if (!tarefa) {
      return res.status(404).render('erro', {
        tituloPagina: 'Tarefa não encontrada',
        mensagem: 'Não foi possível localizar a tarefa solicitada.',
      });
    }

    return res.render('tarefas/form', {
      tituloPagina: 'Editar tarefa',
      acao: `/tarefas/${tarefa.id}?_method=PUT`,
      metodo: 'POST',
      tarefa,
      erros: [],
    });
  },

  editar(req, res) {
    const tarefaAtual = Tarefa.buscarPorId(req.params.id);

    if (!tarefaAtual) {
      return res.status(404).render('erro', {
        tituloPagina: 'Tarefa não encontrada',
        mensagem: 'Não foi possível localizar a tarefa solicitada.',
      });
    }

    const resultado = Tarefa.atualizar(req.params.id, req.body);

    if (!resultado.sucesso) {
      return res.status(400).render('tarefas/form', {
        tituloPagina: 'Editar tarefa',
        acao: `/tarefas/${req.params.id}?_method=PUT`,
        metodo: 'POST',
        tarefa: { ...tarefaAtual, ...req.body },
        erros: resultado.erros,
      });
    }

    return res.redirect(`/tarefas/${req.params.id}?mensagem=Tarefa atualizada com sucesso.`);
  },

  concluir(req, res) {
    const resultado = Tarefa.concluir(req.params.id);

    if (!resultado.sucesso) {
      return res.redirect(`/tarefas?erro=${encodeURIComponent(resultado.erros[0])}`);
    }

    return res.redirect('/tarefas?mensagem=Tarefa marcada como concluída.');
  },

  confirmarExclusao(req, res) {
    const tarefa = Tarefa.buscarPorId(req.params.id);

    if (!tarefa) {
      return res.status(404).render('erro', {
        tituloPagina: 'Tarefa não encontrada',
        mensagem: 'Não foi possível localizar a tarefa solicitada.',
      });
    }

    return res.render('tarefas/excluir', {
      tituloPagina: 'Confirmar exclusão',
      tarefa,
    });
  },

  excluir(req, res) {
    const resultado = Tarefa.excluir(req.params.id);

    if (!resultado.sucesso) {
      return res.redirect(`/tarefas?erro=${encodeURIComponent(resultado.erros[0])}`);
    }

    return res.redirect('/tarefas?mensagem=Tarefa excluída com sucesso.');
  },
};

module.exports = TarefaController;
