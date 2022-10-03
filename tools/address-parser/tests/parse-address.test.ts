/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { AddressParser } from '../src/address-parser'
import { AddressType } from '../src/enums'

describe('Function: parseAddress', () => {
    const parser = new AddressParser()

    it('should handle valid addresses', () => {
        let result = parser.parseAddress('iota1qrhacyfwlcnzkvzteumekfkrrwks98mpdm37cj4xx3drvmjvnep6xqgyzyx')
        expect(result).toEqual({
            hrp: 'iota',
            data: [
                0,  3, 23, 29, 24,  4,  9, 14, 31, 24, 19,  2,
                22, 12,  2, 11, 25, 28, 27, 25, 22,  9, 22,  3,
                3, 14, 22, 16,  5,  7, 27,  1, 13, 27, 17, 30,
                24, 18, 21,  6,  6, 17, 13,  3, 12, 27, 18, 12,
                19, 25,  1, 26, 6,
            ],
            checksum: 'qgyzyx',
            type: AddressType.Ed25519,
        })

        result = parser.parseAddress('smr1qrhacyfwlcnzkvzteumekfkrrwks98mpdm37cj4xx3drvmjvnep6xhcazjh')
        expect(result).toEqual({
            hrp: 'smr',
            data: [
                0,  3, 23, 29, 24,  4,  9, 14, 31, 24, 19,  2,
                22, 12,  2, 11, 25, 28, 27, 25, 22,  9, 22,  3,
                3, 14, 22, 16,  5,  7, 27,  1, 13, 27, 17, 30,
                24, 18, 21,  6,  6, 17, 13,  3, 12, 27, 18, 12,
                19, 25,  1, 26,  6,
            ],
            checksum: 'hcazjh',
            type: AddressType.Ed25519,
        })
    })
})
