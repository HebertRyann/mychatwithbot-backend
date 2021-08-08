<img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">

<h1 align="center">
  MyChatWithBot (Backend)
</h1>

<!-- <h3 align="center">
    <a href="https://hebertryann.github.io/react-gh-pages/#/">Teste o MyChatWithBot</a>
</h3> -->

<p align="center">
  Plataforma criada para além de propor uma comunicação com seus amigos conseguir jogar algo em grupo e torna as conversas bem mais divertidas. Tudo isso gerenciado por um bot de fácil interação além de engraçado
</p>

<h4 align="center"> 
🚧 MyChatWithBot(Backend) Em Andamento 🚧
</h4>

<!-- <h2>
  <p>Login</p>
  <img alt="Login MyChatWithBot" src="./frontend/src/assets/betheherologin.jpeg"/>
</h2> -->

<!-- <h2>
  
  <p>Dashboard</p>
  <img alt="Dashboard BeTheHero" src="./frontend/src/assets/betheherodashboard.jpeg"/>
</h2>

<h2>
  
  <p>Cadastro de Ong</p>
  <img alt="Cadastro BeTheHero" src="./frontend/src/assets/betheherosignup.jpeg"/>
</h2>

<h2>
  
  <p>Cadastro de um novo caso</p>
  <img alt="Novo Caso BeTheHero" src="./frontend/src/assets/betheheronew.jpeg"/>
</h2> -->


<p align="center">
 <a href="#-tecnologias">Tecnologias</a> • 
 <a href="#autor">Autor</a>
</p>

### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- NodeJs
- TypeScript
- SocketIO
- Express
- TypeORM
- SQLite
- MongoDB

### Funcionalidades
---
- Rotas
  - [x] Cadastro de Usuario
  - [x] Solicitação de Amizade
  

## Teste Local
### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), [SQLite](https://www.sqlite.org/index.html), [MongoDB](https://www.mongodb.com/pt-br). Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### 🎲 Rodando o Backend (Servidor)

```bash
# Clone este repositório
$ git clone https://github.com/HebertRyann/mychatwithbot-backend

# Acesse a pasta do projeto no terminal/cmd
$ cd mychatwithbot-backend

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O Servidor ficar disponivel em <http://localhost:3333>
```

### Rotas da aplicação
## Usuarios
```bash
GET http://localhost:3333/user/: <Nome do usuário atual> (Lista todos os usuários existentes exceto o atual)

POST http://localhost:3333/user (Criar um usuário)
Exemplo:
{
  username: <Nome de usuário>
}
```
## Amizades/Relacionamento
```bash
GET http://localhost:3333/friend/list/: <Nome do usuário atual> (Lista todos os amigos do usuário atual)

GET http://localhost:3333/friend/list/solicitation/: <Nome do usuário atual>  (Lista todas as solicitações pendentes para o usuário atual)

POST http://localhost:3333/friend  (Criar um solicitação de amizade)
Exemplo:
{
  username: <Remetente>
  friendUserName: <Destinatário>
}

GET http://localhost:3333/friend/accept/: <ID da solicitação de amizade>  (Aceita a solicitação)

GET http://localhost:3333/friend/reject/: <ID da solicitação de amizade>  (Rejeita a solicitação)
```

### Autor
---

<a href="https://www.linkedin.com/in/hebertryansantos/">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/58072948?v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Hebert Santos</b></sub></a> <a href="https://www.linkedin.com/in/hebertryansantos/" title="Perfil">🚀</a>

Feito com ❤️ por Hebert Santos Com o intuito de consolidar meus conhecimentos 👋🏽 Entre em contato!
#### Para conferir mais sobre meu trabalho e ver mais projetos acesse meu [Portfolio](https://hebertryann.github.io/portfolio/)

[![Linkedin Badge](https://img.shields.io/badge/-Hebert-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/hebertryansantos/)](https://www.linkedin.com/in/hebertryansantos/) 
[![Gmail Badge](https://img.shields.io/badge/-hebertryann40@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:hebertryann40@gmail.com)](mailto:hebertryann40@gmail.com)

