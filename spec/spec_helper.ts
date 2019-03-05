import * as _supertest from 'supertest'
import { createSandbox, spy, stub } from 'sinon'
import factory from './factories'
import API from '../app/api'

const supertest = _supertest(API)
const sandbox = createSandbox()

let setup = () => {
  // before("Clear databases", async () => {
  //   await dropTestDatabases()
  // })
  // afterEach("Clear databases", async () => {
  //   await dropTestDatabases()
  // })

  afterEach(() => sandbox.restore())
}

// let dropTestDatabases = async () => {
//   await db.dropDatabase()
//   await db_bws.dropDatabase()
// }

export { supertest, sandbox, spy, stub, factory, setup }
