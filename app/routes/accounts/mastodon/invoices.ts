import { Request, Response, Router } from 'express'
import { BaseRoute } from '../../base'
import btcPayClient from '../../../lib/btcpay/client'

class MastodonInvoicesRoute extends BaseRoute {
  constructor() { super() }

  public static create(router: Router) {
    router.post('/accounts/mastodon/invoices', (req, res) => {
      new MastodonInvoicesRoute().create(req, res)
    })
    router.get('/accounts/mastodon/invoices/:invoice_id', (req, res) => {
      new MastodonInvoicesRoute().show(req, res)
    })
  }

  public async create(req: Request, res: Response) {
    const { email, price, currency } = req.body
    const hookUrl = process.env.BTCPAY_WEBHOOK_HOST +
                    '/accounts/mastodon/btcpay_hook'
    //TODO validate input

    btcPayClient.create_invoice({
      buyerEmail: email,
      price: price,
      currency: currency,
      transactionSpeed: 'high',
      itemDesc: 'Mastodon account (1 year)',
      itemCode: 'mastodon-signup-donation',
      notificationURL: hookUrl
    })
      .then(invoice => res.status(201).json({ invoice: { id: invoice.id } }))
      .catch(err => this.handleError(res, err))
  }

  public async show(req: Request, res: Response) {
    const invoiceId = req.params.invoice_id

    btcPayClient.get_invoice(invoiceId)
      .then(invoice => res.status(200).json({
        id: invoice.id,
        url: invoice.url,
        status: invoice.status
      }))
      .catch(err => this.handleError(res, err))
  }
}

export default MastodonInvoicesRoute
