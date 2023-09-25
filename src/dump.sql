--Criação do Banco de Dados "dindin"
CREATE DATABASE dindin;

--Criação da tabela usuario
CREATE TABLE usuario (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL
);

--Criação da tabela categorias
CREATE TABLE categorias (
  id SERIAL PRIMARY KEY,
  descricao VARCHAR(255) NOT NULL
);

--Criação da tabalea transacoes
CREATE TABLE transacoes (
  id SERIAL PRIMARY KEY,
  descricao VARCHAR(255) NOT NULL,
  valor INTEGER NOT NULL,
  data DATE DEFAULT NOW(),
  categoria_id INTEGER NOT NULL REFERENCES categorias(id),
  usuario_id INTEGER NOT NULL REFERENCES usuarios(id),
  tipo VARCHAR(255) NOT NULL CHECK (tipo IN ('entrada', 'saida'))
);

--Criação da tabela categoria
CREATE TABLE categorias (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL UNIQUE
);

-- Inserir os valores de categorias
INSERT INTO categorias (descricao) VALUES
('Alimentação'),
('Assinaturas e Serviços'),
('Casa'),
('Mercado'),
('Cuidados Pessoais'),
('Educação'),
('Família'),
('Lazer'),
('Pets'),
('Presentes'),
('Roupas'),
('Saúde'),
('Transporte'),
('Salário'),
('Vendas'),
('Outras receitas'),
('Outras despesas');