import { DeepLinkBuilder } from '../src'

const TEST_RECIPIENT = 'iota1qrhacyfwlcnzkvzteumekfkrrwks98mpdm37cj4xx3drvmjvnep6xqgyzyx'
const TEST_AMOUNT = 4201337

describe('File: deep-link-builder.ts', () => {
    const now = Date.now()
    const builder = new DeepLinkBuilder()

    it ('should contain valid high-level send deep link builder functions', () => {
        let result = builder.buildSendNormalTransactionDeepLink(TEST_RECIPIENT, TEST_AMOUNT)
        let expected = `shimmer:wallet/send?recipient=${TEST_RECIPIENT}&amount=${TEST_AMOUNT}`
        expect(result).toEqual(expected)

        result = builder.buildSendMicroTransactionDeepLink(TEST_RECIPIENT, TEST_AMOUNT, TEST_AMOUNT, TEST_RECIPIENT)
        expected = `shimmer:wallet/send?recipient=${TEST_RECIPIENT}&amount=${TEST_AMOUNT}&storageDepositAmount=${TEST_AMOUNT}&storageDepositReturnAddress=${TEST_RECIPIENT}`
        expect(result).toEqual(expected)

        result = builder.buildSendExpiryTransactionDeepLink(TEST_RECIPIENT, TEST_AMOUNT, now, TEST_RECIPIENT)
        expected = `shimmer:wallet/send?recipient=${TEST_RECIPIENT}&amount=${TEST_AMOUNT}&expirationDate=${now}&expirationReturnAddress=${TEST_RECIPIENT}`
        expect(result).toEqual(expected)

        result = builder.buildSendTimelockTransactionDeepLink(TEST_RECIPIENT, TEST_AMOUNT, now)
        expected = `shimmer:wallet/send?recipient=${TEST_RECIPIENT}&amount=${TEST_AMOUNT}&timelock=${now}`
        expect(result).toEqual(expected)
    })

    it ('should contain valid high-level claim deep link builder functions', () => {
        const OUTPUT_01 = '0x9e8e1a15c831441797912a86022f5a78fcb70e151e43fe84812d4c7f6eb79a7b'
        const OUTPUT_02 = '0x1c8e1a15c831441797912a86022f5a78fcb70e151e43fe84812d4c7f6eb79a7b'

        let result = builder.buildClaimOutputsDeepLink([OUTPUT_01])
        let expected = `shimmer:wallet/claim?outputIds=${OUTPUT_01}`
        expect(result).toEqual(expected)

        result = builder.buildClaimOutputsDeepLink([OUTPUT_01, OUTPUT_02])
        expected = `shimmer:wallet/claim?outputIds=${OUTPUT_01},${OUTPUT_02}`
        expect(result).toEqual(expected)
    })
})
