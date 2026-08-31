# Blog Pessoal

Aplicação full stack para compartilhar ideias, experiências e conteúdos sobre tecnologia. O projeto reúne uma interface responsiva em React, uma API REST em Spring Boot e persistência de dados em banco relacional.

## Aplicação publicada

| Camada | Serviço | Endereço |
| --- | --- | --- |
| Frontend | Vercel | [blogpessoal-react-blush.vercel.app](https://blogpessoal-react-blush.vercel.app/) |
| Backend | Render | [blogpessoal-6s9u.onrender.com](https://blogpessoal-6s9u.onrender.com) |
| Banco de dados de produção | Neon PostgreSQL | Acesso restrito à API |
| Documentação da API | Swagger UI | [Abrir documentação](https://blogpessoal-6s9u.onrender.com/swagger-ui/index.html) |

## Arquitetura

```text
Navegador
   │
   ▼
React + TypeScript (Vercel)
   │  HTTPS / JSON
   ▼
API REST Spring Boot (Render)
   │  Spring Data JPA
   ▼
PostgreSQL (Neon)
```

Em produção, o frontend hospedado na Vercel consome a API publicada no Render. A API é responsável pelas regras de negócio, autenticação e acesso ao banco PostgreSQL hospedado na Neon.

No ambiente de desenvolvimento, o backend também possui um perfil próprio para utilização de um banco MySQL local.

## Funcionalidades

- Cadastro, autenticação e atualização de usuários;
- Autenticação baseada em token JWT;
- Persistência da sessão enquanto o token estiver válido;
- Proteção das páginas e dos endpoints que exigem autenticação;
- Criação, consulta, edição e exclusão de postagens;
- Criação, consulta, edição e exclusão de temas;
- Associação de postagens a usuários e temas;
- Visualização e atualização do perfil do usuário;
- Alternância entre os temas claro e escuro;
- Feedback visual com toasts, loaders e modais;
- Layout responsivo para celulares, tablets e desktops;
- Documentação interativa da API com Swagger UI.

## Tecnologias utilizadas

### Frontend

| Tecnologia | Utilização |
| --- | --- |
| React 19 | Construção da interface e dos componentes |
| TypeScript 6 | Tipagem estática e segurança durante o desenvolvimento |
| Vite 8 | Ambiente de desenvolvimento e geração do build |
| Tailwind CSS 4 | Estilização, responsividade e sistema visual |
| React Router DOM 7 | Rotas e navegação da SPA |
| Context API | Gerenciamento dos estados de autenticação e tema |
| Axios | Comunicação com a API REST |
| React Toastify | Mensagens de sucesso, erro e informação |
| React Spinners | Indicadores de carregamento |
| ReactJS Popup | Exibição de conteúdo em modal |
| Phosphor Icons | Ícones da interface |
| ESLint | Análise estática e padronização do código |

### Backend

| Tecnologia | Utilização |
| --- | --- |
| Java 17 | Linguagem utilizada na API |
| Spring Boot 4 | Estrutura principal do backend |
| Spring Web MVC | Criação dos controllers e endpoints REST |
| Spring Data JPA | Persistência e acesso aos dados |
| Spring Security | Autorização e proteção dos endpoints |
| JWT (JJWT) | Geração e validação dos tokens de acesso |
| BCrypt | Criptografia das senhas dos usuários |
| Bean Validation | Validação dos dados recebidos pela API |
| SpringDoc OpenAPI | Documentação interativa com Swagger UI |
| Maven | Gerenciamento de dependências e build |
| Docker | Empacotamento do backend para publicação |

### Banco de dados e infraestrutura

| Tecnologia | Ambiente |
| --- | --- |
| PostgreSQL | Banco de produção hospedado na Neon |
| MySQL | Banco utilizado pelo perfil local de desenvolvimento |
| Vercel | Hospedagem e entrega do frontend |
| Render | Hospedagem do backend |
| Neon | Hospedagem gerenciada do PostgreSQL de produção |

## Repositórios

- [Frontend — React](https://github.com/victorpgms/blogpessoal_react)
- [Backend — Spring Boot](https://github.com/victorpgms/blog-pessoal-spring)

## Estrutura do frontend

```text
src/
├── components/     # Componentes de navegação, postagens e temas
├── contexts/       # Contextos de autenticação e tema
├── hooks/          # Hooks reutilizáveis
├── models/         # Interfaces TypeScript das entidades
├── pages/          # Páginas principais da aplicação
├── services/       # Configuração e funções de acesso à API
├── utils/          # Funções auxiliares
├── App.tsx         # Configuração das rotas e estrutura principal
└── index.css       # Tokens, estilos globais e componentes visuais
```

## Como executar localmente

### Pré-requisitos

- Node.js em uma versão LTS atual;
- npm;
- Java 17;
- MySQL;
- Git.

### 1. Backend

Clone o repositório da API:

```bash
git clone https://github.com/victorpgms/blog-pessoal-spring.git
cd blog-pessoal-spring
```

O perfil `dev` utiliza o MySQL local, cria o banco `db_blogpessoal` quando necessário e atualiza as tabelas por meio do Hibernate. Caso seu usuário ou senha do MySQL sejam diferentes, ajuste as propriedades do perfil de desenvolvimento antes de iniciar a aplicação.

No Windows:

```powershell
.\mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=dev
```

No Linux ou macOS:

```bash
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

A API estará disponível em `http://localhost:8080`.

### 2. Frontend

Em outro terminal, clone e configure o frontend:

```bash
git clone https://github.com/victorpgms/blogpessoal_react.git
cd blogpessoal_react
npm install
```

Crie um arquivo `.env` na raiz do frontend com o endereço da API:

```env
VITE_API_URL=http://localhost:8080
```

Inicie a aplicação:

```bash
npm run dev
```

Depois, acesse o endereço informado pelo Vite no terminal, normalmente `http://localhost:5173`.

## Variáveis de ambiente do backend em produção

O perfil de produção recebe pelo ambiente do Render as credenciais de conexão fornecidas pela Neon:

| Variável | Finalidade |
| --- | --- |
| `POSTGRESHOST` | Host do PostgreSQL |
| `POSTGRESPORT` | Porta do PostgreSQL |
| `POSTGRESDATABASE` | Nome do banco |
| `POSTGRESUSER` | Usuário do banco |
| `POSTGRESPASSWORD` | Senha do banco |

Os valores dessas variáveis não devem ser versionados no repositório.

## Principais endpoints da API

| Método | Endpoint | Finalidade |
| --- | --- | --- |
| `POST` | `/usuarios/cadastrar` | Cadastrar um usuário |
| `POST` | `/usuarios/logar` | Autenticar um usuário |
| `GET` | `/usuarios/all` | Listar usuários |
| `PUT` | `/usuarios/atualizar` | Atualizar um usuário |
| `GET` | `/postagens` | Listar postagens |
| `GET` | `/postagens/{id}` | Consultar uma postagem |
| `POST` | `/postagens` | Cadastrar uma postagem |
| `PUT` | `/postagens` | Atualizar uma postagem |
| `DELETE` | `/postagens/{id}` | Excluir uma postagem |
| `GET` | `/tema` | Listar temas |
| `GET` | `/tema/{id}` | Consultar um tema |
| `POST` | `/tema` | Cadastrar um tema |
| `PUT` | `/tema` | Atualizar um tema |
| `DELETE` | `/tema/{id}` | Excluir um tema |

Os endpoints protegidos esperam o token no cabeçalho da requisição:

```http
Authorization: Bearer <token>
```

## Scripts do frontend

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Executa o TypeScript e gera o build de produção |
| `npm run lint` | Analisa o projeto com ESLint |
| `npm run preview` | Executa uma prévia local do build |

## Principais rotas do frontend

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

## Autor

Desenvolvido por **Victor Pedro**.

- [GitHub](https://github.com/victorpgms)
- [LinkedIn](https://www.linkedin.com/in/victor-pgms/)
- [Portfólio](https://victorpgms.github.io/portfolio-vpgms/)
