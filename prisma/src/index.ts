import { PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.get('/lessons', async (req, res) => {
  const lessons = await prisma.lessonPlan.findMany()
  res.json({
    success: true,
    payload: lessons,
    message: 'OK',
  })
})

app.use((req, res, next) => {
  res.status(404)
  return res.json({
    success: false,
    payload: null,
    message: `Endpoint ${req.path} is not available.`,
  })
})

app.listen(3000, () => {
  console.log('API is ready at: http://localhost:3000')
})
