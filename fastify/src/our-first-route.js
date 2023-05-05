/**
 * Encapulates the routes
 * @param {FastifyInstance} fastify Encapsulated Fastify instance
 * @param {Object} options Plugin options, @see https://www.fastify.io/docs
 */
async function routes(fastify, options) {
  fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
  })
}

module.exports = routes
