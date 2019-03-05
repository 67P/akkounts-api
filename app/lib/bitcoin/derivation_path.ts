class DerivationPath {

  shortNotation: string
  method: string
  network: string

  constructor(shortNotation: string, opts?: { method?: string, network?: string }) {
    if (typeof opts == 'undefined') { opts = {} }
    this.shortNotation = shortNotation
    this.method = opts.method || 'BIP44'
    this.network = opts.network || 'testnet'
  }

  toArray(): number[] {
    let path
    const derivation = this.shortNotation.split('/')
                           .slice(1)
                           .map(i => parseInt(i))

    switch(this.network) {
      case 'testnet':
        path = [2147483692, 2147483649, 2147483648].concat(derivation)
        break
      default:
        throw Error('not implemented')
    }

    return path
  }

  static toArray(shortNotation: string, opts?: object) {
    const path = new DerivationPath(shortNotation, opts)
    return path.toArray()
  }

}

export default DerivationPath
