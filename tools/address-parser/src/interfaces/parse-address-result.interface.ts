import { AddressType } from '../enums'
import { AddressData } from '../types'

export interface IParseAddressResult {
    hrp: string
    data: AddressData
    checksum: string | number
    type?: AddressType
}
