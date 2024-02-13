import { app } from '../app'
import { expect, test, beforeAll, afterAll, describe } from 'vitest'
import request from 'supertest'

describe('Transaction routes', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  test('User can create a new transaction', async () => {
    const response = await request(app.server).post('/transactions').send({
      title: 'New transaction',
      amount: 5000,
      type: 'credit',
    })

    expect((response.statusCode = 201))
  })
})
