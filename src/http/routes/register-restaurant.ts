import { Elysia, t } from 'elysia'
import { db } from '../../db/connection'
import { restaurants, users } from '../../db/schemas'

export const registerRestaurant = new Elysia().post(
  '/restaurants',
  async ({ body, set }) => {
    const { restaurantName, email, managerName, phone } = body

    const [manager] = await db
      .insert(users)
      .values({
        name: managerName,
        email,
        phone,
        role: 'manager',
      })
      .returning({
        id: users.id,
      })

    await db.insert(restaurants).values({
      name: restaurantName,
      managerId: manager.id,
    })

    set.status = 'Created'
  },
  {
    body: t.Object({
      restaurantName: t.String(),
      managerName: t.String(),
      email: t.String(),
      phone: t.String(),
    }),
  },
)
