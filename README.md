<h1 align="center">
    Geolocation buddy
</h1>

<p align="center">
  <a href="#bookmark-sobre">Sobre o projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#%EF%B8%8F-configuração">Configuração do projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#round_pushpin-rotas">Rotas</a>
</p>

## :bookmark: Sobre

O **Geolocation buddy** é um serviço de localização que permite auxiliar pessoas na localização de pontos de interesse, onde é possível cadastrar novos pontos, listar os pontos cadastrados e listar pontos por proximidade. Os pontos de interesse possui coordenadas X e Y de onde estão localizados, assim como horário de abertura e fechamento se houver. Para pontos de interesse por proximidade é necessário informar as coordenadas X e Y desejadas, distância em metros e horário, dessa forma o serviço é capaz de exibir a lista de locais em funcionamento por proximidade.

O banco de dados escolhido e utilizado foi o MongoDB. O serviço precisa rodar paralelamente junto ao banco para funcionar. Foi utilizado docker para rodar uma imagem do MongoDB para que não seja necessário a instalação do banco de dados na máquina local.

## :rocket: Tecnologias

- [Nest.js](https://nestjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)


## ⚙️ Configuração

- ### **Pré-requisitos**

  - É **necessário** ter o **[Node.js](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)** instalado no computador.
  - É **necessário** ter o **[Docker](https://docs.docker.com/get-docker/)** instalado no computador.
    
- ### Executando o serviço

  ```bash
  # Abra um terminal e copie este repositório com o comando
  $ git clone https://github.com/alexandrecorazza/geolocation-buddy.git

  # Entre no diretório onde o projeto foi clonado
  $ cd geolocation-buddy/

  # Instale as dependências
  $ npm install
    
  # Crie um arquivo .env no diretório raiz do projeto
  # Copie a variavel do arquivo .env.example e cole no .env. Como sugestão você pode substituir '/test' por '/geolocation'

  # Abra outro terminal e suba a imagem do MongoDB via docker compose
  $ docker compose up

  # Execute o serviço
  $ npm start
  ```
- ### Executando os tests
  `npm run test`

## :round_pushpin: Rotas
- ### GET - findAll
  ```bash
  http://localhost:3000/location/findAll
  ```

- ### POST - create
  ```bash
  http://localhost:3000/location/create

  {
    "description": "Shopping Iguatemi",
    "opened": "10:00",
    "closed": "22:00",
    "coordinates": {
        "x": 20,
        "y": 30
    }
  }

  ```

- ### GET - findByNearby
  ```bash
  http://localhost:3000/location/findByNearby?x=20&y=10&mts=10&time=19:00
  
  # Onde x e y são as coordenadas desejadas, mts é a distância e time é a hora
  ```

<br>
