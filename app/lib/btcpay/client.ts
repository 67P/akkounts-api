require('dotenv').config()
const BtcPay = require('btcpay')

const privkey = Buffer.from(process.env.BTCPAY_PRIVKEY, 'hex')
const keypair = BtcPay.crypto.load_keypair(privkey)
const client = new BtcPay.BTCPayClient(process.env.BTCPAY_URL, keypair, {
  merchant: process.env.BTCPAY_MERCHANT
})

export default client
