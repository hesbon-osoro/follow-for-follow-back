// @ts-nocheck
import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schemas';
import { resolvers } from './resolvers';

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

// apolloServer.listen().then(({url})=>console.log(`Server started at ${url}`))

const startServer = apolloServer.start();

export default async function handler(req, res) {
  await startServer;
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
}
