import { ALPHABET_MAP, CHECKSUM_LENGTH } from './constants'
import { AddressType } from './enums'
import { IParseAddressResult } from './interfaces'
import { Address } from './types'

export function validateAddress(address: Address, encodingConstant: number, limit: number): IParseAddressResult | string {
    // 1. Check address length
    if (!address) {
        return 'Invalid address argument'
    } else if (address.length < 8) {
        return `"${address}" is too short`
    } else if (address.length > limit) {
        return 'Exceeds length limit'
    }

    // 2. Check character casing
    const lowered = address.toLowerCase()
    const uppered = address.toUpperCase()
    if (address !== lowered && address !== uppered) {
        return `"${address}" contains mixed-case characters`
    } else {
        address = lowered
    }

    // 3. Check prefix and separator
    const split = address.lastIndexOf('1')
    if (split === -1) {
        return 'No separator character for ' + address
    } else if (split === 0) {
        return 'Missing prefix for ' + address
    }

    // 4. Get HRP and check length of data
    const hrp = address.slice(0, split)
    const dataChars = address.slice(split + 1)
    const dataCharsLength = dataChars.length
    const checksum = dataChars.slice(dataCharsLength - CHECKSUM_LENGTH)
    if (dataChars.length < CHECKSUM_LENGTH) {
        return 'Data too short'
    }

    // 5. Derive the address type
    let type: AddressType
    const typeIndicator = dataChars[0]
    if (typeIndicator === 'q') {
        type = AddressType.Ed25519
    } else if (typeIndicator === 'p') {
        type = AddressType.Alias
    } else if (typeIndicator === 'z') {
        type = AddressType.Nft
    }

    // 6. Validate checksum
    let hrpCheck = checkHrp(hrp)
    if (typeof hrpCheck === 'string') {
        return hrpCheck
    }

    const data = []
    for (let i = 0; i < dataChars.length; i++) {
        const c = dataChars.charAt(i)
        const v = ALPHABET_MAP[c]
        if (v === undefined) {
            return 'Unknown character ' + c
        }

        hrpCheck = polymodStep(hrpCheck) ^ v

        // not in the checksum?
        const isChecksumChar = i + 6 >= dataChars.length
        if (isChecksumChar) {
            continue
        } else {
            data.push(v)
        }
    }

    if (hrpCheck !== encodingConstant) {
        return 'Invalid checksum for ' + address
    } else {
        return {
            hrp,
            data,
            checksum,
            ...(type && { type }),
        }
    }
}

function checkHrp(hrp: string): number | string {
    let chk = 1
    for (let i = 0; i < hrp.length; ++i) {
        const c = hrp.charCodeAt(i)
        if (c < 33 || c > 126) return 'Invalid prefix (' + hrp + ')'

        chk = polymodStep(chk) ^ (c >> 5)
    }
    chk = polymodStep(chk)

    for (let i = 0; i < hrp.length; ++i) {
        const v = hrp.charCodeAt(i)
        chk = polymodStep(chk) ^ (v & 0x1f)
    }
    return chk
}

function polymodStep(pre: number): number {
    const b = pre >> 25
    return (
        ((pre & 0x1ffffff) << 5) ^
        (-((b >> 0) & 1) & 0x3b6a57b2) ^
        (-((b >> 1) & 1) & 0x26508e6d) ^
        (-((b >> 2) & 1) & 0x1ea119fa) ^
        (-((b >> 3) & 1) & 0x3d4233dd) ^
        (-((b >> 4) & 1) & 0x2a1462b3)
    )
}
