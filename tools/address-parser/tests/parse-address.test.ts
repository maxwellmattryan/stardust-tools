/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { AddressParser } from '../src/address-parser'
import { AddressType } from '../src/enums'

describe('Function: parseAddress', () => {
    const parser = new AddressParser()

    it('should handle Ed25519 addresses', () => {
        let result = parser.parseAddress('iota1qrhacyfwlcnzkvzteumekfkrrwks98mpdm37cj4xx3drvmjvnep6xqgyzyx')
        expect(result).toEqual({
            hrp: 'iota',
            data: [
                0, 3, 23, 29, 24, 4, 9, 14, 31, 24, 19, 2, 22, 12, 2, 11, 25, 28, 27, 25, 22, 9, 22, 3, 3, 14, 22, 16,
                5, 7, 27, 1, 13, 27, 17, 30, 24, 18, 21, 6, 6, 17, 13, 3, 12, 27, 18, 12, 19, 25, 1, 26, 6,
            ],
            checksum: 'qgyzyx',
            type: AddressType.Ed25519,
        })

        result = parser.parseAddress('smr1qrhacyfwlcnzkvzteumekfkrrwks98mpdm37cj4xx3drvmjvnep6xhcazjh')
        expect(result).toEqual({
            hrp: 'smr',
            data: [
                0, 3, 23, 29, 24, 4, 9, 14, 31, 24, 19, 2, 22, 12, 2, 11, 25, 28, 27, 25, 22, 9, 22, 3, 3, 14, 22, 16,
                5, 7, 27, 1, 13, 27, 17, 30, 24, 18, 21, 6, 6, 17, 13, 3, 12, 27, 18, 12, 19, 25, 1, 26, 6,
            ],
            checksum: 'hcazjh',
            type: AddressType.Ed25519,
        })
    })

    it('should handle Alias addresses', () => {
        let result = parser.parseAddress('iota1prlgpsht03ekmghhex8v7y67a835uns8dtlxu807hj0v279c74kj76j6rev')
        expect(result).toEqual({
            hrp: 'iota',
            data: [
                1, 3, 31, 8, 1, 16, 23, 11, 15, 17, 25, 22, 27, 8, 23, 23, 25, 6, 7, 12, 30, 4, 26, 30, 29, 7, 17, 20,
                28, 19, 16, 7, 13, 11, 31, 6, 28, 7, 15, 30, 23, 18, 15, 12, 10, 30, 5, 24, 30, 21, 22, 18, 30,
            ],
            checksum: '6j6rev',
            type: AddressType.Alias,
        })

        result = parser.parseAddress('rms1prlgpsht03ekmghhex8v7y67a835uns8dtlxu807hj0v279c74kj7e9ge5y')
        expect(result).toEqual({
            hrp: 'rms',
            data: [
                1, 3, 31, 8, 1, 16, 23, 11, 15, 17, 25, 22, 27, 8, 23, 23, 25, 6, 7, 12, 30, 4, 26, 30, 29, 7, 17, 20,
                28, 19, 16, 7, 13, 11, 31, 6, 28, 7, 15, 30, 23, 18, 15, 12, 10, 30, 5, 24, 30, 21, 22, 18, 30,
            ],
            checksum: 'e9ge5y',
            type: AddressType.Alias,
        })
    })

    it('should handle NFT addresses', () => {
        let result = parser.parseAddress('atoi1zqc4nvg4ufcj3dkmzmd4uc034fx8pkz2nxl820a28mnsmxkec6ntwgz87pn')
        expect(result).toEqual({
            hrp: 'atoi',
            data: [
                2, 0, 24, 21, 19, 12, 8, 21, 28, 9, 24, 18, 17, 13, 22, 27, 2, 27, 13, 21, 28, 24, 15, 17, 21, 9, 6, 7,
                1, 22, 2, 10, 19, 6, 31, 7, 10, 15, 29, 10, 7, 27, 19, 16, 27, 6, 22, 25, 24, 26, 19, 11, 14,
            ],
            checksum: 'gz87pn',
            type: AddressType.Nft,
        })

        result = parser.parseAddress('smr1zqc4nvg4ufcj3dkmzmd4uc034fx8pkz2nxl820a28mnsmxkec6ntwcu0ld0')
        expect(result).toEqual({
            hrp: 'smr',
            data: [
                2, 0, 24, 21, 19, 12, 8, 21, 28, 9, 24, 18, 17, 13, 22, 27, 2, 27, 13, 21, 28, 24, 15, 17, 21, 9, 6, 7,
                1, 22, 2, 10, 19, 6, 31, 7, 10, 15, 29, 10, 7, 27, 19, 16, 27, 6, 22, 25, 24, 26, 19, 11, 14,
            ],
            checksum: 'cu0ld0',
            type: AddressType.Nft,
        })
    })
})
