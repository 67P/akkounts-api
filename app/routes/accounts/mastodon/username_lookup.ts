import { Request, Response, Router } from 'express'
import BaseRoute from '../../base'

class MastodonUsernameLookupRoute extends BaseRoute {
  constructor () { super() }

  public static create (router: Router) {
    router.get('/accounts/mastodon/username_lookup', (req, res) => {
      new MastodonUsernameLookupRoute().lookup(req, res)
    })
  }

  public async lookup (req: Request, res: Response) {
    const username = req.query.q
    if (typeof username !== 'string') {
      return res.status(422).json({
        error: { message: 'Query param "q" must be a string' }
      })
    }
    const axios = this.createMastodonClient()

    axios.get(`/accounts/search?q=${username}`)
      .then(result => {
        const accounts = result.data
        if (accounts.find(a => a.username.toLowerCase() === username.toLowerCase())) {
          res.status(200).json({ available: false })
        } else {
          res.status(200).json({ available: true })
        }
      })
      .catch(err => {
        return this.handleError(res, err)
      })
  }
}

export default MastodonUsernameLookupRoute
