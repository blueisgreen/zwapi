const prisma = require('@prisma/client')
const client = new prisma.PrismaClient()

// use prisma to resolve graphQL queries

/**
 * Prisma tips

Next steps:
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.
3. Run prisma db pull to turn your database schema into a Prisma schema.
4. Run prisma generate to generate the Prisma Client. You can then start querying your database.

*/

const schema = `
  type Mutation {
    createLessonPlan(title: String!): LessonPlan
  }

  enum LessonStatus {
    DRAFT
    IN_REVIEW
    PUBLISHED
    ARCHIVED
  }

  type LessonPlan {
    id: ID!
    title: String!
    subtitle: String
    cover: String
    synopsis: String
    objective: String
    status: LessonStatus
    content: String
    createdAt: String
    updatedAt: String
    publishedAt: String
    archivedAt: String
  }

  type Query {
    add(x: Int, y: Int): Int
    lessonPlans: [LessonPlan]
  }
`

const resolvers = {
  Query: {
    add: async (_, { x, y }) => x + y,
    lessonPlans: async (_parent, args, ctx) => {
      return ctx.prisma.lessonPlans.findMany()
    },
  },
  Mutation: {
    createLessonPlan: async (_parent, args, ctx) => {
      return ctx.prisma.post.create({
        data: {
          title: args.title,
        },
      })
    },
  },
}

module.exports = { schema, resolvers }
