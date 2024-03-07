/* eslint-disable drizzle/enforce-delete-with-where */
import { faker } from '@faker-js/faker'
import { users, restaurants } from './schemas'
import { db } from './connection'
import chalk from 'chalk'

console.log(chalk.yellow('�� Deleting existing data... ��'))
await db.delete(restaurants)
await db.delete(users)

console.log(chalk.yellow('�� Creating customers... ��'))
await db.insert(users).values([
  {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: 'customer',
  },
  {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: 'customer',
  },
])

console.log(chalk.yellow('�� Creating manager... ��'))
const [manager] = await db
  .insert(users)
  .values([
    {
      name: faker.person.fullName(),
      email: 'admin@admin.com',
      role: 'manager',
    },
  ])
  .returning({
    id: users.id,
  })

console.log(chalk.yellow('�� Creating restaurant... ��'))
await db.insert(restaurants).values([
  {
    name: faker.company.name(),
    description: faker.lorem.paragraph(),
    managerId: manager.id,
  },
])

console.log(chalk.greenBright('✅ Database seeded successfully! 🫡'))

process.exit(0)
