/**
 * Model: responsável pelos dados e regras de negócio das tarefas.
 * Armazenamento em memória (array de objetos), conforme o enunciado.
 */
class Tarefa {
  static #tarefas = [];
  static #proximoId = 1;

  static STATUS = {
    PENDENTE: 'pendente',
    CONCLUIDA: 'concluida',
  };

  static listar(filtro = 'todas') {
    if (filtro === Tarefa.STATUS.PENDENTE) {
      return Tarefa.#tarefas.filter((t) => t.status === Tarefa.STATUS.PENDENTE);
    }

    if (filtro === Tarefa.STATUS.CONCLUIDA) {
      return Tarefa.#tarefas.filter((t) => t.status === Tarefa.STATUS.CONCLUIDA);
    }

    return [...Tarefa.#tarefas];
  }

  static buscarPorId(id) {
    const tarefaId = Number(id);
    return Tarefa.#tarefas.find((t) => t.id === tarefaId) || null;
  }

  static validar({ titulo, descricao, disciplina }, { parcial = false } = {}) {
    const erros = [];

    const tituloTrim = typeof titulo === 'string' ? titulo.trim() : '';
    const disciplinaTrim = typeof disciplina === 'string' ? disciplina.trim() : '';
    const descricaoTrim =
      descricao === undefined || descricao === null
        ? ''
        : String(descricao).trim();

    if (!parcial || titulo !== undefined) {
      if (!tituloTrim) {
        erros.push('O título é obrigatório.');
      } else if (tituloTrim.length < 3 || tituloTrim.length > 100) {
        erros.push('O título deve ter entre 3 e 100 caracteres.');
      }
    }

    if (!parcial || disciplina !== undefined) {
      if (!disciplinaTrim) {
        erros.push('A disciplina é obrigatória.');
      } else if (disciplinaTrim.length < 2 || disciplinaTrim.length > 80) {
        erros.push('A disciplina deve ter entre 2 e 80 caracteres.');
      }
    }

    if (descricaoTrim.length > 500) {
      erros.push('A descrição deve ter no máximo 500 caracteres.');
    }

    return {
      valido: erros.length === 0,
      erros,
      dados: {
        titulo: tituloTrim,
        descricao: descricaoTrim || null,
        disciplina: disciplinaTrim,
      },
    };
  }

  static criar({ titulo, descricao, disciplina }) {
    const validacao = Tarefa.validar({ titulo, descricao, disciplina });

    if (!validacao.valido) {
      return { sucesso: false, erros: validacao.erros };
    }

    const novaTarefa = {
      id: Tarefa.#proximoId++,
      titulo: validacao.dados.titulo,
      descricao: validacao.dados.descricao,
      disciplina: validacao.dados.disciplina,
      status: Tarefa.STATUS.PENDENTE,
      criadaEm: new Date().toISOString(),
      atualizadaEm: new Date().toISOString(),
    };

    Tarefa.#tarefas.push(novaTarefa);
    return { sucesso: true, tarefa: novaTarefa };
  }

  static atualizar(id, { titulo, descricao, disciplina }) {
    const tarefa = Tarefa.buscarPorId(id);

    if (!tarefa) {
      return { sucesso: false, erros: ['Tarefa não encontrada.'] };
    }

    const validacao = Tarefa.validar({ titulo, descricao, disciplina });

    if (!validacao.valido) {
      return { sucesso: false, erros: validacao.erros };
    }

    tarefa.titulo = validacao.dados.titulo;
    tarefa.descricao = validacao.dados.descricao;
    tarefa.disciplina = validacao.dados.disciplina;
    tarefa.atualizadaEm = new Date().toISOString();

    return { sucesso: true, tarefa };
  }

  static concluir(id) {
    const tarefa = Tarefa.buscarPorId(id);

    if (!tarefa) {
      return { sucesso: false, erros: ['Tarefa não encontrada.'] };
    }

    if (tarefa.status === Tarefa.STATUS.CONCLUIDA) {
      return { sucesso: false, erros: ['Esta tarefa já está concluída.'] };
    }

    tarefa.status = Tarefa.STATUS.CONCLUIDA;
    tarefa.atualizadaEm = new Date().toISOString();

    return { sucesso: true, tarefa };
  }

  static excluir(id) {
    const indice = Tarefa.#tarefas.findIndex((t) => t.id === Number(id));

    if (indice === -1) {
      return { sucesso: false, erros: ['Tarefa não encontrada.'] };
    }

    const [removida] = Tarefa.#tarefas.splice(indice, 1);
    return { sucesso: true, tarefa: removida };
  }
}

module.exports = Tarefa;
