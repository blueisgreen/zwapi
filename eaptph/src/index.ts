import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { PrismaClient } from '@prisma/client'
import express from 'express'
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'

const prisma = new PrismaClient()

// The GraphQL schema
const typeDefs = `#graphql
  type Query {
    lessons: [LessonPlan]
  }

  type LessonPlan {
    publicKey: publicKey!
    title: String!
    subtitle: String
    cover: String
    synopsis: String
    objective: String
  }
`

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    boards: () => {
      return prisma.lessonPlan.findMany()
    },
  },
}

const app = express()
const httpServer = http.createServer(app)

// Set up Apollo Server
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})
await apolloServer.start()

app.use(cors(), bodyParser.json(), expressMiddleware(apolloServer))

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve))
console.log(`🚀 Server ready at http://localhost:4000/graphql`)
