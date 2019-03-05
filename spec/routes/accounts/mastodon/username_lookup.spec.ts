import { expect } from 'chai'
import { supertest, sandbox, factory, setup } from '../../../spec_helper'
import { BaseRoute } from '../../../../app/routes/base'

setup()

describe('GET /accounts/mastodon/username_lookup', () => {

  describe('query param missing', () => {
    it('returns an error', async () => {
      await supertest
        .get(`/accounts/mastodon/username_lookup`)
        .set('Accept', 'application/json')
        .expect(422)
    })
  })

  context('username does not exist', () => {
    before(() => {
      sandbox.stub(BaseRoute.prototype, 'createMastodonClient').returns({
        get: url => { return Promise.resolve({ data: [] }) }
      })
    })

    it('returns the correct response', async () => {
      const username = 'thegrinch'
      await supertest
        .get(`/accounts/mastodon/username_lookup?q=${username}`)
        .set('Accept', 'application/json')
        .expect(200, { available: true })
    })
  })

  context('username exists', () => {
    before(() => {
      sandbox.stub(BaseRoute.prototype, 'createMastodonClient').returns({
        get: url => { return Promise.resolve({ data: [
          { username: 'satoshi', display_name: 'Satoshi Nakamoto' }
        ] }) }
      })
    })

    it('returns the correct response', async () => {
      const username = 'satoshi'
      await supertest
        .get(`/accounts/mastodon/username_lookup?q=${username}`)
        .set('Accept', 'application/json')
        .expect(200, { available: false })
    })
  })

  context('username exists with different capitalization', () => {
    before(() => {
      sandbox.stub(BaseRoute.prototype, 'createMastodonClient').returns({
        get: url => { return Promise.resolve({ data: [
          { username: 'Satoshi', display_name: 'Satoshi Nakamoto' }
        ] }) }
      })
    })

    it('returns the correct response', async () => {
      const username = 'satoshi'
      await supertest
        .get(`/accounts/mastodon/username_lookup?q=${username}`)
        .set('Accept', 'application/json')
        .expect(200, { available: false })
    })
  })

})
