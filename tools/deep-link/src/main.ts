import { AddressParser } from 'iota-address-parser'

import { DeepLinkBuilder } from './deep-link-builder'

function runDeepLink(): void {
    const addressParser = new AddressParser()
    const isAddressValid = addressParser.isValidAddress('')
    console.log('IS VALID: ', isAddressValid)

    const deepLinkBuilder = new DeepLinkBuilder()
    console.log(deepLinkBuilder.buildSendTransactionDeepLink({
        recipient: '',
        amount: 420,
    }))
}

runDeepLink()
