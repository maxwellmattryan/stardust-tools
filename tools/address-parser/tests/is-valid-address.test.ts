/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { AddressParser } from '../src/address-parser'

describe('Function: isValidAddress', () => {
    const parser = new AddressParser()

    it('should handle valid addresses', () => {
        expect(parser.isValidAddress('iota1qrhacyfwlcnzkvzteumekfkrrwks98mpdm37cj4xx3drvmjvnep6xqgyzyx')).toBe(true)
        expect(parser.isValidAddress('smr1qrhacyfwlcnzkvzteumekfkrrwks98mpdm37cj4xx3drvmjvnep6xhcazjh')).toBe(true)
    })

    it('should handle invalid addresses', () => {
        // Invalid argument type
        expect(parser.isValidAddress(undefined)).toBe(false)
        expect(parser.isValidAddress(null)).toBe(false)

        // Invalid length
        expect(parser.isValidAddress('')).toBe(false)
        expect(parser.isValidAddress('iota1qys')).toBe(false)

        // Invalid characters
        expect(parser.isValidAddress('iota1qrhacyfwl>zkvzteumekfk&rwks98mpdm37cj4-x3drvmjvnep6x8x4r7t')).toBe(false)

        // Invalid separator
        expect(parser.isValidAddress('iotaqrhacyfwlcnzkvzteumekfkrrwks98mpdm37cj4xx3drvmjvnep6xqgyzys')).toBe(false)
        expect(parser.isValidAddress('iota11qrhacyfwlcnzkvzteumekfkrrwks98mpdm37cj4xx3drvmjvnep6x8x4r7t')).toBe(false)
        expect(parser.isValidAddress('iota2qrhacyfwlcnzkvzteumekfkrrwks98mpdm37cj4xx3drvmjvnep6xqgyzys')).toBe(false)

        // Invalid checksums
        expect(parser.isValidAddress('iotaa1qrhacyfwlcnzkvzteumekfkrrwks98mpdm37cj4xx3drvmjvnep6x8x4r7t')).toBe(false)
        expect(parser.isValidAddress('iota1qrhacyfwlcnzkvzteumekfkrrwks98mpdm37cj4xx3drvmjvnep6xqgyzys')).toBe(false)
        expect(parser.isValidAddress('iota1qrhacyfwlcnzkvzteumekfkrrwks98mpdm37cj4xx3drvmjvnep6x8x4r7t')).toBe(false)

        // Invalid address type
        expect(parser.isValidAddress('iota1brhacyfwlcnzkvzteumekfkrrwks98mpdm37cj4xx3drvmjvnep6xqgyzyx')).toBe(false)
        expect(parser.isValidAddress('smr1drhacyfwlcnzkvzteumekfkrrwks98mpdm37cj4xx3drvmjvnep6xhcazjh')).toBe(false)
    })
})
