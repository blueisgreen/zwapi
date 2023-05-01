import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // const firstLesson = await prisma.lessonPlan.create({
  //   data: { title: 'Atomic Basics' },
  // })
  // console.log('a lesson', firstLesson)

  // const moreLessons = await prisma.lessonPlan.createMany({
  //   data: [{ title: 'When Atoms Split' }, { title: 'PWRs' }],
  // })
  // console.log('more lessons', moreLessons)

  // const zanzi = await prisma.user.create({
  //   data: {
  //     name: 'Zanzibar',
  //     email: 'zanzisworld42@gmail.com',
  //     posts: {
  //       create: { title: 'What would you like to know about nuclear power?' },
  //     },
  //     profile: {
  //       create: { bio: 'I am Zanzi' },
  //     },
  //   },
  // })
  // console.log('zanzi', zanzi)

  const allUsers = await prisma.user.findMany()
  const allPosts = await prisma.post.findMany()
  const allLessons = await prisma.lessonPlan.findMany()
  console.log('everything', {
    lessons: allLessons,
    users: allUsers,
    posts: allPosts,
  })

  // const post = await prisma.post.update({
  //   where: { id: 1 },
  //   data: { published: true },
  // })
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect())
