# Gestão de Tarefas Acadêmicas

App em Node.js + Express + EJS para organizar tarefas da faculdade.
Usei o padrão MVC e guardei os dados em um array na memória (sem banco).

## Como rodar

```bash
npm install
npm start
```

Depois abre: http://localhost:3000

## MVC

- **Model** → `src/models/Tarefa.js` (array, validações e regras)
- **Controller** → `src/controllers/TarefaController.js` (trata as requisições)
- **View** → `src/views/` (páginas EJS)
- **Rotas** → `src/routes/tarefaRoutes.js`

Fluxo: rota chama o controller → controller usa o model → view devolve o HTML.

## O que dá pra fazer

- Cadastrar tarefa
- Listar
- Ver detalhes
- Editar
- Marcar como concluída
- Excluir (pede confirmação)
- Filtrar: todas, pendentes ou concluídas

## Campos

- `id` — gerado automaticamente
- `titulo` — obrigatório (3 a 100 caracteres)
- `descricao` — opcional (até 500)
- `disciplina` — obrigatória (2 a 80 caracteres)
- `status` — `pendente` ou `concluida` (começa como pendente)

## Estrutura

```text
gestao-tarefas-academicas/
├── public/css/
├── src/
│   ├── app.js
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── views/
├── server.js
└── package.json
```

## Obs.

Os dados somem quando o servidor reinicia, porque tudo fica só na memória.
