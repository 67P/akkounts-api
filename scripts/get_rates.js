'use strict'

require('dotenv').config()
const BtcPay = require('btcpay')

const keypair = BtcPay.crypto.load_keypair(new Buffer.from(process.env.BTCPAY_PRIVKEY, 'hex'))
const client = new BtcPay.BTCPayClient(process.env.BTCPAY_URL, keypair,
                                       { merchant: process.env.BTCPAY_MERCHANT })

client.get_rates('BTC_USD', process.env.BTCPAY_STORE_ID)
  .then(rates => console.log(rates))
  .catch(err => console.log(err))
