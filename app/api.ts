import * as express from 'express'
import * as cors from 'cors'
import IndexRoute from "./routes/index"
import MastodonUsernameLookupRoute from "./routes/accounts/mastodon/username_lookup"
import MastodonInvoicesRoute from "./routes/accounts/mastodon/invoices"
import MastodonRegistrationsRoute from "./routes/accounts/mastodon/registrations"
import MastodonBtcPayHookRoute from "./routes/accounts/mastodon/btcpay_hook"

require('dotenv').config()

class API {
  public express

  constructor () {
    this.express = express()
    this.config()
    this.routes()
  }

  public config() {
    this.express.use(express.json())
    this.express.use(cors())
    this.express.set('etag', false)
  }

  private routes (): void {
    const router = express.Router()

    IndexRoute.create(router)

    MastodonUsernameLookupRoute.create(router)
    MastodonInvoicesRoute.create(router)
    MastodonRegistrationsRoute.create(router)
    MastodonBtcPayHookRoute.create(router)

    this.express.use('/', router)
  }
}

export default new API().express
