import { inspect } from 'util'
import { Request, Response, Router } from 'express'
import BaseRoute from '../../base'
import btcPayClient from '../../../lib/btcpay/client'
import { sendMail } from '../../../lib/nodemailer'

class MastodonBtcPayHookRoute extends BaseRoute {
  constructor () { super() }

  public static create (router: Router) {
    router.post('/accounts/mastodon/btcpay_hook', (req, res) => {
      new MastodonBtcPayHookRoute().receive(req, res)
    })
  }

  public async receive (req: Request, res: Response) {
    console.debug('body:', inspect(req.body))
    console.debug('params:', inspect(req.query))

    if (req.body.status !== 'confirmed') return res.status(200)

    if ((typeof req.query.token !== 'string')
        || (req.query.token !== process.env.BTCPAY_WEBHOOK_TOKEN)) {
      return res.status(401).json({
        error: { message: 'Unauthorized' }
      })
    }

    const invite = await this.createInvite()
    const recipient = req.body.buyerFields.buyerEmail
    const message = this.createMessage(invite.code)

    sendMail({
      recipient,
      subject: 'Your invite',
      content: message
    }).then(() => res.status(200))
      .catch(err => this.handleError(res, err))

    return res.status(200).json({ status: 'OK' })
  }

  private createMessage (inviteCode: String) {
    const inviteUrl = `${process.env.MASTODON_HOST}/invite/${inviteCode}`
    const message = 'Here\'s your invite link for creating an account on kosmos.social:'
                  + `\n\n${inviteUrl}\n\n`
                  + 'Welcome to the community!'
    return message
  }

  private createInvite () {
    const axios = this.createMastodonClient()
    return axios.post('/invites')
      .then(result => result.data)
      .catch(console.error)
  }
}

export default MastodonBtcPayHookRoute
