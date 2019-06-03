import { expect } from 'chai'
import { supertest, sandbox, factory, setup } from '../../../spec_helper'
import BaseRoute from '../../../../app/routes/base'

setup()

describe('POST /accounts/mastodon/btcpay_hook', () => {

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

})
