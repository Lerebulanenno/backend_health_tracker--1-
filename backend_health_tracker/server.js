import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema/index.js';
import { resolvers } from './resolver/index.js';
import db from './db.js';

db.connect((err) => {
  if (err) {
    console.error('Koneksi ke database gagal: ', err);
  } else {
    console.log('Terhubung ke database');
  }
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 3000 },
});

console.log(`🚀 Server ready at ${url}`);
