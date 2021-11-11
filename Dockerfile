FROM node:16-alpine3.12

WORKDIR /usr/src/app
COPY . .

ENV DATABASE_URL "mongodb://mongo:27017"
ENV DB_NAME "workmize"
ENV JWT_KEY "q644Cg6bnSCUYmkT"

RUN yarn
RUN yarn build

CMD ["yarn", "start"]