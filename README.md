# Gestão de Tarefas Acadêmicas

Aplicação web em **Node.js** para cadastrar, consultar, editar, concluir, filtrar e excluir tarefas acadêmicas, organizada no padrão **MVC** e com armazenamento **em memória** (array de objetos).

## Tecnologias

- Node.js
- Express
- EJS (Views)
- method-override (PUT/DELETE via formulários HTML)

## Padrão MVC

| Camada | Pasta | Responsabilidade |
|--------|-------|------------------|
| **Model** | `src/models/Tarefa.js` | Dados em memória, validações e regras de negócio |
| **View** | `src/views/` | Interface HTML (listagem, formulários, detalhes, confirmação) |
| **Controller** | `src/controllers/TarefaController.js` | Recebe requisições, chama o Model e escolhe a View |
| **Rotas** | `src/routes/tarefaRoutes.js` | Mapeia URLs para ações do Controller |

Fluxo resumido:

1. O navegador envia uma requisição HTTP.
2. A rota direciona para o Controller.
3. O Controller usa o Model (array em memória).
4. A View renderiza a resposta em HTML.

## Dados da tarefa

| Campo | Regra |
|-------|-------|
| `id` | Identificador único gerado pela aplicação |
| `titulo` | Obrigatório, 3 a 100 caracteres |
| `descricao` | Opcional, até 500 caracteres |
| `disciplina` | Obrigatória, 2 a 80 caracteres |
| `status` | `pendente` ou `concluida` (inicia como `pendente`) |

## Funcionalidades

- **Cadastrar** tarefa
- **Listar** tarefas com status
- **Consultar detalhes**
- **Editar** título, descrição e disciplina
- **Concluir** (pendente → concluída)
- **Excluir** com tela de confirmação
- **Filtrar** todas / pendentes / concluídas

## Como executar

```bash
npm install
npm start
```

Acesse: [http://localhost:3000](http://localhost:3000)

## Estrutura do projeto

```text
gestao-tarefas-academicas/
├── public/css/style.css
├── src/
│   ├── app.js
│   ├── controllers/TarefaController.js
│   ├── models/Tarefa.js
│   ├── routes/tarefaRoutes.js
│   └── views/
│       ├── erro.ejs
│       ├── partials/
│       └── tarefas/
├── server.js
├── package.json
└── README.md
```

## Observação sobre memória

Como os dados ficam em um array na memória do processo Node.js, ao reiniciar o servidor as tarefas são perdidas. Isso atende ao requisito da atividade.
