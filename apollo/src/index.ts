import Fastify from 'fastify'
import { ApolloServer, BaseContext } from '@apollo/server'
import fastifyApollo, {
  fastifyApolloDrainPlugin,
} from '@as-integrations/fastify'

const fastify = Fastify({
  logger: true,
})

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
]

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
  },
}

const apollo = new ApolloServer<BaseContext>({
  typeDefs,
  resolvers,
  plugins: [fastifyApolloDrainPlugin(fastify)],
})

await apollo.start()

fastify.get('/ping', async (request, reply) => {
  return 'pong\n'
})

await fastify.register(fastifyApollo(apollo))

const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
