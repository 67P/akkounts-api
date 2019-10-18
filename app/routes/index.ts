import { Request, Response, Router } from 'express'
import BaseRoute from './base'

class IndexRoute extends BaseRoute {

  constructor () { super() }

  public static create (router: Router) {
    router.get('/', (req: Request, res: Response) => {
      new IndexRoute().index(req, res)
    })
  }

  public index (req: Request, res: Response) {
    res.json({ status: 'OK' })
  }

}

export default IndexRoute
