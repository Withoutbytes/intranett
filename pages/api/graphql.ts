import "reflect-metadata"; // avoid TypeError: Reflect.metadata is not a function

import { NextApiHandler } from 'next';
import { buildSchemaSync } from 'type-graphql';
import { ApolloServer, AuthenticationError } from 'apollo-server-micro';
import NextCors from 'nextjs-cors';
import jwt from "jsonwebtoken";

import { Context } from 'types/Context';
import { UserJWT } from 'types/UserJWT';

import { UserResolver } from "lib/backend/user/user.resolver";
import { authChecker } from 'lib/backend/authChecker';
import { TaskResolver } from 'lib/backend/task/task.resolver';
import { CompanyResolver } from "lib/backend/company/company.resolver";
import { createInititalEnterprise } from 'lib/backend/createInititalEnterprise';


const schema = buildSchemaSync({
  resolvers: [TaskResolver, UserResolver, CompanyResolver],
  // emitSchemaFile: path.resolve(__dirname, "schema.gql"),
  authChecker,
});

createInititalEnterprise().then(() => {
  console.log("Initial Enterprise created 'Workmize'");
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