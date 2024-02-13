import { app } from '../app'
import { expect, test, beforeAll, afterAll, describe } from 'vitest'
import request from 'supertest'

// describe usado para englobar testes semelhantes - ajuda no debug
describe('Transaction routes', () => {
  // tudo que tiver aqui roda antes dos testes
  beforeAll(async () => {
    await app.ready()
  })

  // tudo que tiver aqui roda depois dos testes
  afterAll(async () => {
    await app.close()
  })

  // sintaxe padrao para criar um teste com 'test' ou 'it'
  // only ou skip apos o test ajudam a rodar o teste unico. todo ajuda a lembrar do teste esquecido

  test('User can create a new transaction', async () => {
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      })
      .expect(201)
  })

  test('User can list all transactions', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      })

    const cookies = createTransactionResponse.get('Set-Cookie')

    console.log(createTransactionResponse)
    const allTransactions = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    expect(allTransactions.body.transactions).toEqual([
      expect.objectContaining({ title: 'New transaction', amount: 5000 }),
    ])
  })
})
