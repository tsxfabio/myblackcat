# Meu Gato Preto

Este repositório é parte de uma prova de conceito (POC) para o desenvolvimento do backend de uma aplicação voltada para a adoção de gatos pretos. O objetivo é permitir o gerenciamento de informações relacionadas ao cadastro de gatos, adoções e seus respectivos adotantes.

## Funcionalidades

- **Cadastro de Gatos**:
  - Adicionar novos gatos ao sistema com informações como nome, idade, gênero e histórico de saúde.
  - Atualizar ou remover gatos cadastrados.

- **Gestão de Adoções**:
  - Registrar adoções de gatos por novos tutores.
  - Visualizar histórico de adoção.

- **Gestão de Adotantes**:
  - Cadastro de adotantes com informações pessoais.
  - Vinculação de adotantes aos gatos adotados.

## Tecnologias Utilizadas

- **Node.js**: Plataforma para executar o backend.
- **Fastify**: Framework rápido e leve para criação de APIs.
- **Prisma**: ORM para interação com o banco de dados.
- **PostgreSQL**: Banco de dados relacional utilizado para armazenar as informações da aplicação.
- **Docker**: Contêinerização para padronizar o ambiente de execução.

## Estrutura do Projeto

- **src/**: Contém o código-fonte da aplicação.
  - **controllers/**: Lógica de negócio para as rotas.
  - **routes/**: Definição de rotas da API.
  - **models/**: Representação das entidades do banco de dados.
  - **services/**: Módulos de serviços para integrações e funcionalidades auxiliares.

- **prisma/**: Arquivos de configuração e migração do banco de dados.
- **Dockerfile**: Configuração para criação do contêiner da aplicação.
- **docker-compose.yml**: Configuração para subir o banco de dados PostgreSQL em contêiner.

## Requisitos para Execução

- Node.js (recomendado: v18+)
- Docker e Docker Compose
- PostgreSQL (se for executar fora do Docker)

## Como Executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/tsxfabio/myblackcat.git
   cd myblackcat
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o banco de dados:
   - Crie um arquivo `.env` baseado no exemplo `.env.example`.
   - Configure as variáveis de ambiente para acessar o banco de dados.

4. Execute as migrações do Prisma:
   ```bash
   npx prisma migrate dev
   ```

5. Execute a aplicação em modo de desenvolvimento:
   ```bash
   npm run dev
   ```

6. A API estará disponível em: `http://localhost:3000`

## Rotas da API

- **Gatos:**
  - `GET /cats`: Lista todos os gatos.
  - `POST /cats`: Cadastra um novo gato.
  - `PUT /cats/:id`: Atualiza os dados de um gato.
  - `DELETE /cats/:id`: Remove um gato.

- **Adoções:**
  - `POST /adoptions`: Registra uma nova adoção.
  - `GET /adoptions`: Lista todas as adoções.

- **Adotantes:**
  - `GET /adopters`: Lista todos os adotantes.
  - `POST /adopters`: Cadastra um novo adotante.

## Testes

Para executar os testes, utilize o comando:
```bash
npm test
```

## Contribuição

Contribuições são bem-vindas! Abra uma issue ou envie um pull request para melhorias ou correções.

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo `LICENSE` para mais informações.

