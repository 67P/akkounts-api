BTCPAY_URL=https://btcpay.kosmos.org \
BTCPAY_KEY=62579d9b5877f3fcd95dfec78703c554da56132da8bb1a0bf974b5ee6223c57f \
BTCPAY_PAIRCODE=aADUXkv \
node -e "const btcpay=require('btcpay'); new btcpay.BTCPayClient(process.env.BTCPAY_URL, btcpay.crypto.load_keypair(Buffer.from(process.env.BTCPAY_KEY, 'hex'))).pair_client(process.env.BTCPAY_PAIRCODE).then(console.log).catch(console.error)"
