FROM node:16-alpine3.12

WORKDIR /node-app

COPY package.json .
RUN yarn

COPY . .

ENV DATABASE_URL "mongodb://mongo:27017"
ENV DB_NAME "workmize"
ENV JWT_KEY "q644Cg6bnSCUYmkT"

RUN yarn build

CMD ["yarn", "start"]