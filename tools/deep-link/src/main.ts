import { AddressParser } from 'iota-address-parser'

function runDeepLink(): void {
    const parser = new AddressParser()
    const isValid = parser.isValidAddress('')
    console.log('IS VALID: ', isValid)
}

runDeepLink()
