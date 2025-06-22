// fastify-app.ts
import Fastify from 'fastify'

const app = Fastify()
const port = 3000

app.get('/', async (request, reply) => {
  return { message: 'Hello, World!' };
})

app.listen({ port }, err => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server is running on http://localhost:${port}`)
})
