import { expect } from 'chai'
import { supertest, sandbox, factory, setup } from '../../../spec_helper'
import BaseRoute from '../../../../app/routes/base'

setup()

describe('POST /accounts/mastodon/btcpay_hook', () => {

  before(() => {
    process.env.BTCPAY_WEBHOOK_TOKEN = 'supersecure'
  })

  describe('auth token missing', () => {
    it('returns an error', async () => {
      await supertest
        .post('/accounts/mastodon/btcpay_hook')
        .set('Content-Type', 'application/json')
        .send({ status: 'confirmed' })
        .expect(401)
        .then(res => {
          expect(res.body.error.message).to.eq('Unauthorized')
        })
    })
  })

  describe('auth token is invalid', () => {
    it('returns an error', async () => {
      await supertest
        .post('/accounts/mastodon/btcpay_hook?token=123456')
        .set('Content-Type', 'application/json')
        .send({ status: 'confirmed' })
        .expect(401)
        .then(res => {
          expect(res.body.error.message).to.eq('Unauthorized')
        })
    })
  })

  describe('successful request', () => {
    before(() => {
      sandbox
        .stub(BaseRoute.prototype, 'createMastodonClient')
        .returns({
          post: url => {
            return Promise.resolve({
              data: { code: '123abc' }
            })
          }
        })
    })

    it('returns a 200', async () => {
      await supertest
        .post('/accounts/mastodon/btcpay_hook?token=supersecure')
        .set('Content-Type', 'application/json')
        .send({
          buyerFields: {
            buyerEmail: 'satoshi@kosmos.org'
          },
          status: 'confirmed'
        })
        .expect(200)
        .then(res => {
          expect(res.body.status).to.eq('OK')
        })
    })
  })

})
