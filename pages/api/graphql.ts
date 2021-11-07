import { ApolloServer, AuthenticationError } from 'apollo-server-micro';
import { buildSchemaSync } from 'type-graphql';
import Cors from "micro-cors";
import path from 'path';
import NextCors from 'nextjs-cors';
import jwt from "jsonwebtoken";

import { UserResolver } from "lib/backend/user/user.resolver";
import { NextApiHandler } from 'next';
import { authChecker } from 'lib/backend/authChecker';
import { Context } from 'types/Context';
import { UserJWT } from 'types/UserJWT';

const schema = buildSchemaSync({
  resolvers: [UserResolver],
  // emitSchemaFile: path.resolve(__dirname, "schema.gql"),
  authChecker,
});


const apolloServer = new ApolloServer({
  schema,
  playground: true,
  introspection: true,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    const ret: Context = {};
    if (token) {
      try {
        const user = jwt.verify(token, process.env.JWT_KEY);
        ret.user = user as UserJWT;
      } catch (e) {
        throw new AuthenticationError('Invalid token');
      }
    }
    return ret;
  }
});


export const config = {
  api: {
    bodyParser: false,
  },
}

const handler: NextApiHandler = async (req, res) => {
  await NextCors(req, res, {
    origin: '*',
  })

  return apolloServer.createHandler({ path: '/api/graphql' })(req, res);
}

export default handler;