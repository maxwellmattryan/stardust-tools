import { Bech32AddressType, Bech32Data, Bech32Hrp, IParseResult, parseBech32Address } from '../src/bech32'

describe('File: bech32.ts', () => {
    const VALID_IOTA_MAINNET_ED25519_ADDRESS = 'iota1qrhacyfwlcnzkvzteumekfkrrwks98mpdm37cj4xx3drvmjvnep6xqgyzyx'
    const VALID_IOTA_DEVNET_ED25519_ADDRESS = 'atoi1qrhacyfwlcnzkvzteumekfkrrwks98mpdm37cj4xx3drvmjvnep6x8x4r7t'
    const VALID_SHIMMER_MAINNET_ED25519_ADDRESS = 'smr1qrhacyfwlcnzkvzteumekfkrrwks98mpdm37cj4xx3drvmjvnep6xhcazjh'
    const VALID_SHIMMER_TESTNET_ED25519_ADDRESS = 'rms1qrhacyfwlcnzkvzteumekfkrrwks98mpdm37cj4xx3drvmjvnep6xrlkcfw'

    const INVALID_IOTA_MAINNET_ED25519_ADDRESS = 'iota1qrhacyfwlcnzkvzteumekfkrrwks98mpdm37cj4xx3drvmjvnep6x8x4r7t'
    const INVALID_IOTA_DEVNET_ED25519_ADDRESS = 'atoi1qrhacyfwlcnzkvzteumekfkrrwks98mpdm37cj4xx3drvmjvnep6xqgyzyx'
    const INVALID_SHIMMER_MAINNET_ED25519_ADDRESS = 'smr1qrhacyfwlcnzkvzteumekfkrrwks98mpdm37cj4xx3drvmjvnep6xrlkcfw'
    const INVALID_SHIMMER_TESTNET_ED25519_ADDRESS = 'rms1qrhacyfwlcnzkvzteumekfkrrwks98mpdm37cj4xx3drvmjvnep6xhcazjh'

    describe('Function: parseBech32Address', () => {
        it('should handle valid Bech32 addresses (Ed25519)', () => {
            const actual01: IParseResult = parseBech32Address(VALID_IOTA_MAINNET_ED25519_ADDRESS)
            const expected01: IParseResult = {
                hrp: Bech32Hrp.IOTA,
                data: [
                    0,  3, 23, 29, 24,  4,  9, 14, 31, 24, 19,  2,
                    22, 12,  2, 11, 25, 28, 27, 25, 22,  9, 22,  3,
                    3, 14, 22, 16,  5,  7, 27,  1, 13, 27, 17, 30,
                    24, 18, 21,  6,  6, 17, 13,  3, 12, 27, 18, 12,
                    19, 25,  1, 26,  6,  0,  8,  4,  2,  4,  6,
                ],
                addressType: Bech32AddressType.Ed25519,
            }
            expect(actual01).toEqual(expected01)

            const actual02: IParseResult = parseBech32Address(VALID_SHIMMER_TESTNET_ED25519_ADDRESS)
            const expected02: IParseResult = {
                hrp: Bech32Hrp.RMS,
                data: [
                    0,  3, 23, 29, 24,  4,  9, 14, 31, 24, 19,  2,
                    22, 12,  2, 11, 25, 28, 27, 25, 22,  9, 22,  3,
                    3, 14, 22, 16,  5,  7, 27,  1, 13, 27, 17, 30,
                    24, 18, 21,  6,  6, 17, 13,  3, 12, 27, 18, 12,
                    19, 25,  1, 26,  6,  3, 31, 22, 24,  9, 14
                ],
                addressType: Bech32AddressType.Ed25519,
            }
            expect(actual02).toEqual(expected02)
        })

        it('should handle invalid Bech32 addresses', () => {
            expect(parseBech32Address(undefined)).toBeUndefined()
            expect(parseBech32Address('')).toBeUndefined()
        })
    })
})
