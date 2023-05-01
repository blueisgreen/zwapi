import Fastify from 'fastify'
import { ApolloServer, BaseContext } from '@apollo/server'
import fastifyApollo, {
  fastifyApolloDrainPlugin,
} from '@as-integrations/fastify'

const fastify = Fastify({
  logger: true,
})

const apollo =
  new ApolloServer() <
  BaseContext >
  {
    typeDefs,
    resolvers,
    plugins: [fastifyApolloDrainPlugin(fastify)],
  }

fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
