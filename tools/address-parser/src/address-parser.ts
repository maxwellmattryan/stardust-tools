import { validateAddress } from './bech32'
import { DEFAULT_ADDRESS_PARSER_OPTIONS } from './constants'
import { AddressEncoding } from './enums'
import { IAddressParser, IAddressParserOptions, IParseAddressResult } from './interfaces'
import { Address } from './types'

export class AddressParser implements IAddressParser {
    private readonly _encoding: AddressEncoding
    private readonly _limit: number

    constructor(options: IAddressParserOptions = DEFAULT_ADDRESS_PARSER_OPTIONS) {
        const { encoding, limit } = options ?? {}

        this._encoding = this._validateEncoding(encoding)
        this._limit = this._validateLimit(limit)
    }

    private _validateEncoding(encoding: AddressEncoding): AddressEncoding {
        if (!encoding || !Object.values(AddressEncoding).includes(encoding)) {
            throw new Error('Invalid encoding scheme')
        }

        return encoding
    }

    private _validateLimit(limit: number): number {
        if (!limit) {
            throw new Error('Invalid address limit')
        } else if (limit > 90) {
            throw new Error('Address limit is too large')
        }

        return limit
    }

    public parseAddress(address: Address): IParseAddressResult {
        const result = validateAddress(address, this._encoding, this._limit)
        const isValidAddress = typeof result === 'object'
        if (isValidAddress) {
            return result
        } else {
            throw new Error(result)
        }
    }

    public isValidAddress(address: Address): boolean {
        const result = validateAddress(address, this._encoding, this._limit)
        return typeof result === 'object'
    }
}
