import { Request, Response, Router } from 'express'
import { BaseRoute } from '../../base'
import { inspect } from 'util'

class MastodonRegistrationsRoute extends BaseRoute {
  constructor() { super() }

  public static create(router: Router) {
    router.post('/accounts/mastodon/registration', (req, res) => {
      new MastodonRegistrationsRoute().signup(req, res)
    })
  }

  public async signup(req: Request, res: Response) {
    const { username, email, password } = req.body
    // if (typeof username !== 'string') {
    //   return res.status(422).json({
    //     error: { message: 'Query param "q" must be a string' }
    //   })
    // }
    const axios = this.createMastodonClient()

    axios.post('/accounts', {
      username: username,
      email: email,
      password: password,
      agreement: true,
      locale: 'en'
    })
      .then(result => {
        res.status(200).json(result.data)
      })
      .catch(err => {
        if (err.response.status === 422) {
          res.status(422).json(err.response.data)
        } else {
          return this.handleError(res, err)
        }
      })
  }
}

export default MastodonRegistrationsRoute
