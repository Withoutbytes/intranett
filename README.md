# Workmize

## Sobre

* Software de gestão de tarefas.
* Projeto para a vaga back-end em Node.js, Intranett
* Feito por: Jonathan, E-Mail: jonathan.santos1635@gmail.com
* Projeto também está hospedado em: https://intranett.vercel.app/
  
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