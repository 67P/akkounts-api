import * as FactoryGirl from 'factory-girl'
import * as fixtures from './support/fixtures'

const factory = FactoryGirl.factory

// factory.define('customer', Customer, {
//   companyName: 'Scrooge McDuck'
// })
//
// factory.define('account', Account, {
//   owner: factory.assoc('customer', '_id'),
//   walletId: factory.assoc('wallet', 'id'),
//   asset: 'BTC'
// })
//
// factory.define('apiKey', APIKey, {
//   customer: factory.assoc('customer', '_id')
// })

export default factory
