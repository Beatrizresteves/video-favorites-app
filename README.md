# Video Favorites App

## Descrição

A Video Favorites App é uma aplicação web que permite aos usuários buscar vídeos no YouTube, visualizar os resultados da busca e marcar vídeos como favoritos. A aplicação possui duas principais funcionalidades: buscar vídeos e gerenciar a lista de favoritos.

## Funcionalidades

- **Busca de Vídeos**: Permite ao usuário buscar vídeos no YouTube utilizando a API do YouTube.
- **Marcar Favoritos**: Os usuários podem marcar vídeos como favoritos e visualizá-los em uma lista dedicada.
- **Remover Favoritos**: Os usuários podem remover vídeos da lista de favoritos.

## Estrutura do Projeto

O projeto é dividido em duas partes principais:

- **Frontend**: Contém os arquivos HTML, CSS e JavaScript.
- **Backend (BFF - Backend for Frontend)**: Contém a lógica de backend necessária para buscar vídeos na API do YouTube e gerenciar a lista de favoritos.

## Configuração e Execução

### Pré-requisitos

- Docker
- Docker Compose
- Node.js (versão 14 ou superior)
- npm (Node Package Manager)

### Passos para Configuração

1. Clone este repositório:
    ```sh
    git clone https://github.com/seu-usuario/video-favorites-app.git
    cd video-favorites-app
    ```

2. Configure a API Key do YouTube:
   - No arquivo `backend/server.js`, localize a variável `API_KEY` e insira sua chave da API do YouTube:
     ```sh
     const API_KEY = 'Sua_API_Key_Aqui';
     ```

2. Instale as dependências do backend:
    ```sh
    cd bff
    npm install
    cd ..
    ```

3. Construa e inicie os serviços Docker:
    ```sh
    docker-compose up --build
    ```

4. Acesse a aplicação:
    - A aplicação frontend estará disponível em [http://localhost:8080](http://localhost:8080).
    - A aplicação backend estará disponível em [http://localhost:3000](http://localhost:3000).

