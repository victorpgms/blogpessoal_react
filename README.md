# Blog Pessoal

Aplicação front-end de um blog pessoal para compartilhar ideias, experiências e conteúdos sobre tecnologia. O projeto oferece autenticação, gerenciamento de postagens e temas, perfil de usuário e uma interface responsiva com suporte aos temas claro e escuro.

## Sobre o projeto

O Blog Pessoal foi desenvolvido com React e TypeScript como uma aplicação de página única (SPA). A interface consome uma API REST para autenticar usuários e realizar operações de criação, consulta, edição e exclusão de postagens e temas.

O design utiliza uma identidade visual própria baseada em tons neutros e indigo, com foco em legibilidade, acessibilidade e consistência entre dispositivos.

## Funcionalidades

- Cadastro e autenticação de usuários;
- Proteção das páginas que exigem autenticação;
- Criação, listagem, edição e exclusão de postagens;
- Criação, listagem, edição e exclusão de temas;
- Associação de postagens a temas e usuários;
- Visualização e atualização do perfil;
- Alternância entre os temas claro e escuro;
- Persistência da preferência de tema no navegador;
- Detecção automática da preferência de tema do sistema;
- Feedback visual com toasts, loaders e modais;
- Layout responsivo para celulares, tablets e desktops.

## Tecnologias utilizadas

| Tecnologia | Utilização |
| --- | --- |
| React 19 | Construção da interface e dos componentes |
| TypeScript 6 | Tipagem estática e maior segurança durante o desenvolvimento |
| Vite 8 | Ambiente de desenvolvimento e geração do build |
| Tailwind CSS 4 | Estilização, responsividade e sistema visual |
| React Router DOM 7 | Rotas e navegação da aplicação |
| Context API | Gerenciamento do estado de autenticação e do tema |
| Axios | Comunicação com a API REST |
| React Toastify | Mensagens de sucesso, erro e informação |
| React Spinners | Indicadores de carregamento |
| ReactJS Popup | Exibição de conteúdo em modal |
| Phosphor Icons | Ícones da interface |
| ESLint | Análise estática e padronização do código |

## Estrutura do projeto

```text
src/
├── components/     # Componentes de navegação, postagens e temas
├── contexts/       # Contextos de autenticação e tema
├── hooks/          # Hooks reutilizáveis
├── models/         # Interfaces TypeScript das entidades
├── pages/          # Páginas principais da aplicação
├── services/       # Configuração e funções de acesso à API
├── utils/          # Funções auxiliares, como os alertas
├── App.tsx         # Configuração das rotas e estrutura principal
└── index.css       # Tokens, estilos globais e componentes visuais
```

## Como executar localmente

### Pré-requisitos

- Node.js em uma versão LTS atual;
- npm.

### Instalação

```bash
git clone https://github.com/victorpgms/blogpessoal_react.git
cd blogpessoal_react
npm install
npm run dev
```

Depois, acesse o endereço informado pelo Vite no terminal, normalmente `http://localhost:5173`.

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Executa o TypeScript e gera o build de produção |
| `npm run lint` | Analisa o projeto com ESLint |
| `npm run preview` | Executa uma prévia local do build |

## Integração com a API

A aplicação consome a API REST hospedada em:

```text
https://blogpessoal-6s9u.onrender.com
```

O endereço base e as funções de requisição estão centralizados em `src/services/Service.ts`.

## Principais rotas

| Rota | Finalidade |
| --- | --- |
| `/` | Login |
| `/cadastro` | Cadastro de usuário |
| `/home` | Página inicial e feed |
| `/postagens` | Listagem de postagens |
| `/cadastrarpostagem` | Cadastro de postagem |
| `/editarpostagem/:id` | Edição de postagem |
| `/deletarpostagem/:id` | Exclusão de postagem |
| `/tema` | Listagem de temas |
| `/cadastrartema` | Cadastro de tema |
| `/editartema/:id` | Edição de tema |
| `/deletartema/:id` | Exclusão de tema |
| `/perfil` | Perfil do usuário |
| `/atualizarusuario` | Atualização do perfil |

As rotas de edição e exclusão utilizam o identificador do respectivo recurso.

## Autor

Desenvolvido por **Victor Pedro**.

- [GitHub](https://github.com/victorpgms)
- [LinkedIn](https://www.linkedin.com/in/victor-pgms/)
- [Portfólio](https://victorpgms.github.io/portfolio-vpgms/)
