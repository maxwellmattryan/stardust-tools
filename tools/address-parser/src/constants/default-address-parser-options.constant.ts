import { AddressEncoding } from '../enums'
import { IAddressParserOptions } from '../interfaces'

export const DEFAULT_ADDRESS_PARSER_OPTIONS: IAddressParserOptions = {
    encoding: AddressEncoding.Bech32,
    limit: 64,
}
