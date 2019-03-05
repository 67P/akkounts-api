import { expect } from 'chai'
import { setup, supertest } from '../spec_helper'

setup()

describe('GET /', () => {
  it('works', async () =>
    await supertest
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200, {
        message: 'Hello blockchain!'
      })
  )
})
