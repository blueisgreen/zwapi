/**
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */
const fastify = require('fastify')({
  logger: true,
})

const firstRoute = require('./our-first-route.js')
fastify.register(firstRoute)

const prisma = require('@prisma/client')

const mercurius = require('mercurius')
const { schema, resolvers } = require('./graphQLplumbing.js')
fastify.register(mercurius, {
  schema,
  resolvers,
  context: (request, reply) => {
    return { prisma }
  },
  graphiql: true,
})

fastify.get('/mathql', async function (req, reply) {
  const { x, y } = req.query
  fastify.log.info('blargy x=' + x + ' y=' + y)
  const query = `{ add(x: ${x}, y: ${y})}`
  return reply.graphql(query)
})
fastify.get('/lessonPlans', async function (req, reply) {
  const query = `lessonPlans { ... }`
  return reply.graphql(query)
})

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
