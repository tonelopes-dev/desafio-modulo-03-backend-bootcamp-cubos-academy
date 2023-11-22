![](https://i.imgur.com/xG74tOh.png)

# Desafio Módulo 3 - Backend

Este projeto foi desenvolvido como parte do Desafio do Módulo 3 durante o bootcamp da Cubos Academy. O objetivo era construir uma RESTful API capaz de gerenciar transações financeiras de usuários. A API permite o cadastro de usuários, login, detalhamento e edição de perfil, categorias, transações, entre outras funcionalidades.

[Instruções do Projeto](./src/README.md)

## Estrutura do Projeto

O projeto possui uma estrutura organizada com arquivos específicos para diferentes responsabilidades:

- **index.js:** Arquivo principal do projeto.
- **conexao.js:** Configuração de conexão com o banco de dados PostgreSQL.
- **rotas.js:** Definição das rotas da API.
- **controladores/:** Pasta contendo os controladores para cada rota.
- **sql/:** Pasta contendo scripts SQL para criação do banco de dados e inserção de categorias.

## Banco de Dados

Foi utilizado o banco de dados PostgreSQL com um esquema chamado dindin. O esquema contém três tabelas:

- **usuarios:** Armazena informações dos usuários, como nome, e-mail e senha.
- **categorias:** Contém as categorias pré-cadastradas para as transações.
- **transacoes:** Armazena as transações dos usuários, incluindo descrição, valor, data, categoria, tipo (entrada ou saída), entre outros.

## Funcionalidades Principais

### A API implementa as seguintes funcionalidades:

**Cadastro de Usuário (POST /usuario):**
Permite o cadastro de novos usuários com validação de campos obrigatórios, e-mail único e criptografia de senha.

**Login (POST /login):** Possibilita o login de usuários, gerando um token de autenticação.

**Detalhamento de Perfil (GET /usuario):** Retorna as informações do perfil do usuário logado.

**Atualização de Perfil (PUT /usuario):** Permite a atualização do perfil do usuário logado, com validações necessárias.

**Listagem de Categorias (GET /categoria):** Retorna a lista de categorias cadastradas.

**Listagem de Transações (GET /transacao):** Retorna as transações do usuário logado, podendo ser filtradas por categoria.

**Detalhamento de Transação (GET /transacao/:id):** Retorna os detalhes de uma transação específica do usuário logado.

**Cadastro de Transação (POST /transacao):** Permite o cadastro de novas transações associadas ao usuário logado, com validações e registro no banco de dados.

**Atualização de Transação (PUT /transacao/:id):** Permite a atualização de transações do usuário logado, com validações necessárias.

**Exclusão de Transação (DELETE /transacao/:id):** Permite a exclusão de transações do usuário logado, com validações.

**Extrato de Transações (GET /transacao/extrato):** Retorna o extrato das transações do usuário logado, com a soma das transações de entrada e saída.

## Status Codes

A API utiliza códigos de status HTTP para indicar o resultado de cada requisição, garantindo uma comunicação clara entre o cliente e o servidor. Os principais códigos utilizados são:

- **200 (OK):** Requisição bem-sucedida.
- **201 (Created):** Recurso criado com sucesso.
- **204 (No Content):** Requisição bem-sucedida, sem conteúdo no corpo da resposta.
- **400 (Bad Request):** Erro na requisição devido a sintaxe/formato inválido.
- **401 (Unauthorized):** Usuário não autenticado.
- **403 (Forbidden):** Usuário não tem permissão para acessar o recurso solicitado.
- **404 (Not Found):** Recurso não encontrado.

## Considerações Finais

O projeto atende aos requisitos obrigatórios, garantindo a segurança das operações e o correto armazenamento das informações no banco de dados. A estrutura modular facilita a manutenção e expansão da API. O README fornece uma visão geral das funcionalidades e da estrutura do projeto, permitindo que outros desenvolvedores entendam e contribuam para o código.
