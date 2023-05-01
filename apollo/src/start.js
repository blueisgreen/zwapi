import fastify from 'fastify'
// import { ApolloServer, BaseContext } from '@apollo/server'
// import fastifyApollo, {
//   fastifyApolloDrainPlugin,
// } from '@as-integrations/fastify'

const server = fastify({
  logger: true,
})

// const apollo =
//   new ApolloServer() <
//   BaseContext >
//   {
//     typeDefs,
//     resolvers,
//     plugins: [fastifyApolloDrainPlugin(fastify)],
//   }

server.get('/', async (request, reply) => {
  return { hello: 'world' }
})

/**
 * Run the server!
 */
const start = async () => {
  try {
    await server.listen({ port: 3000 })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}
start()
