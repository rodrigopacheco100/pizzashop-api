import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { registerRestaurant } from './routes/register-restaurant'

const app = new Elysia()

app.use(
  swagger({
    documentation: {
      info: {
        title: 'Pizza Shop API',
        version: '1.0.0',
      },
    },
  }),
)

app.use(registerRestaurant)

app.listen(3333, (a) => {
  console.log('🔥 Server is running!', a.url.href)
})
