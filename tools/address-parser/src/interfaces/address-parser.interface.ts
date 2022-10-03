import { Address } from '../types'

import { IParseAddressResult } from './parse-address-result.interface'

export interface IAddressParser {
    parseAddress(address: Address): IParseAddressResult
    // parseAddressUnsafe(address: Address): IParseAddressResult | undefined
    isValidAddress(address: Address): boolean
}
