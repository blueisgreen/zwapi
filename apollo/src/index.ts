import fastify from 'fastify'
// import { ApolloServer, BaseContext } from '@apollo/server'
// import fastifyApollo, {
//   fastifyApolloDrainPlugin,
// } from '@as-integrations/fastify'

interface IQuerystring {
  username: string
  password: string
}

interface IHeaders {
  'h-Custom': string
}

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

server.get('/ping', async (request, reply) => {
  return 'pong\n'
})

server.get<{
  Querystring: IQuerystring
  Headers: IHeaders
}>('/auth', async (request, reply) => {
  const { username, password } = request.query
  const customHeader = request.headers['h-Custom']
  console.log('inputs', { username, password, customHeader })
  return 'logged in!'
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
