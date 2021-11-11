# Workmize

## Sobre

* Software de gestão de tarefas.
* Projeto para a vaga back-end em Node.js, Intranett
* Feito por: Jonathan, E-Mail: jonathan.santos1635@gmail.com
* Projeto também está hospedado em: https://intranett.vercel.app/
* Google Docs, com comentários e as instruções que foram usadas para fazer o projeto: https://docs.google.com/document/d/1hMkzLRPvixSvN86BRC51-fqt9QD-Vmq6JyHcc9Akyho/edit#
  
## Deploy

* Por padrão o servidor roda na porta 3000, para alterar basta colocar a váriavel de ambiente `PORT={porta desejada}`

### Requisitos

* Docker e Docker compose, https://docs.docker.com/desktop/windows/install/
  
### Comandos de inicialização

#### Com docker

* `docker-compose up`

#### Sem docker (requer node 16 e yarn instalado)

* `yarn`
* `yarn build`
* `yarn start`

## Váriaveis de ambiente

* JWT_KEY, chave JWT.
* DATABASE_URL, url do banco de dados mongodb, já com usuário e senha.