FROM node:12.18.3

WORKDIR /usr/src/app
COPY . .

ENV DATABASE_URL "mongodb://mongo:27017"
ENV DB_NAME workmize

RUN yarn
RUN yarn build

CMD ["yarn", "start"]