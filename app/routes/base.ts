import { Request, Response } from 'express'
import * as colors from 'colors/safe'
import axios from 'axios'

export default class {

  public handleError (res: Response, err: { message: string, stack: any }) {
    console.log(colors.red('Encountered an error, aborting request (500):'))
    console.log(colors.gray(err.stack))
    res.sendStatus(500)
  }

  public createMastodonClient () {
    const host = process.env.MASTODON_HOST
    const authToken = process.env.MASTODON_AUTH_TOKEN
    const client = axios.create({})
    client.defaults.baseURL = `${host}/api/v1`
    client.defaults.headers.common.Authorization = `Bearer ${authToken}`
    return client
  }

}
