const CHARSET = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l'
const GENERATOR = [0x3b6a57b2, 0x26508e6d, 0x1ea119fa, 0x3d4233dd, 0x2a1462b3]

export enum Bech32Encoding {
    BECH_32 = 'bech32',
    BECH_32_M = 'bech32m',
}

export interface IBech32Decoding {
    hrp: Bech32Hrp,
    data: Bech32Data
}

export enum Bech32Hrp {
    IOTA = 'iota',
    ATOI = 'atoi',
    SMR = 'smr',
    RMS = 'rms',
}

export type Bech32Data = number[]

export type Bech32Checksum = number[]

export enum Bech32AddressType {
    Ed25519 = 'ed25519',
    Alias = 'alias',
    Nft = 'nft',
}

export interface IParseResult {
    hrp: Bech32Hrp
    data: Bech32Data
    addressType: Bech32AddressType
}

///
/// EXTERNAL API
///

export function parseBech32Address(address: string): IParseResult | undefined {
    // Validate the following:
    //      has valid HRP
    //      has valid checksum
    //      has valid address type

    if (!address || typeof address !== 'string') {
        return undefined
    }

    console.log('ADDRESS: ', address)

    const decodedAddress = decode(address)
    if (!decodedAddress) {
        return undefined
    }

    const { hrp, data } = decodedAddress
    if (!hrp || !data) {
        return undefined
    }

    console.log('HRP: ', hrp)
    console.log('DATA: ', data)
    console.log('VALID: ', verifyChecksum(hrp, data))
    console.log('\n')

    return {
        hrp,
        data,
        addressType: Bech32AddressType.Ed25519,
    }
}

///
/// INTERNAL API
///

export function decode(address: string, encoding = Bech32Encoding.BECH_32): IBech32Decoding {
    let p: number
    let has_lower = false
    let has_upper = false
    for (p = 0; p < address.length; ++p) {
        if (address.charCodeAt(p) < 33 || address.charCodeAt(p) > 126) {
            return null
        }
        if (address.charCodeAt(p) >= 97 && address.charCodeAt(p) <= 122) {
            has_lower = true
        }
        if (address.charCodeAt(p) >= 65 && address.charCodeAt(p) <= 90) {
            has_upper = true
        }
    }
    if (has_lower && has_upper) {
        return null
    }
    address = address.toLowerCase()

    const pos = address.lastIndexOf('1')
    if (pos < 1 || pos + 7 > address.length || address.length > 90) {
        return null
    }

    const hrp = <Bech32Hrp>address.substring(0, pos)
    if (!Object.values(Bech32Hrp).includes(hrp)) {
        return null
    }

    const data: Bech32Data = []
    for (p = pos + 1; p < address.length; ++p) {
        const d = CHARSET.indexOf(address.charAt(p))
        if (d === -1) {
            return null
        }
        data.push(d)
    }

    return {
        hrp,
        data,
    }
}

export function verifyChecksum(hrp: Bech32Hrp, data: Bech32Data, encoding = Bech32Encoding.BECH_32) {
    return polymod(hrpExpand(hrp).concat(data)) === getEncodingConst(encoding)
}

function polymod(values: Bech32Data): number {
    let chk = 1

    for (let p = 0; p < values.length; ++p) {
        const top = chk >> 25
        chk = (chk & 0x1ffffff) << 5 ^ values[p]
        for (let i = 0; i < 5; ++i) {
            if ((top >> i) & 1) {
                chk ^= GENERATOR[i]
            }
        }
    }
    return chk
}

function hrpExpand(hrp: Bech32Hrp): Bech32Data {
    const ret: Bech32Data = []

    let p: number
    for (p = 0; p < hrp.length; ++p) {
        ret.push(hrp.charCodeAt(p) >> 5)
    }
    ret.push(0)
    for (p = 0; p < hrp.length; ++p) {
        ret.push(hrp.charCodeAt(p) & 31)
    }

    return ret
}

function getEncodingConst(encoding: Bech32Encoding): number {
    switch (encoding) {
        case Bech32Encoding.BECH_32:
            return 1
        case Bech32Encoding.BECH_32_M:
            return 0x2bc830a3
        default:
            return null
    }
}

export function encode(hrp: Bech32Hrp, data: Bech32Data, encoding: Bech32Encoding): string {
    const combined = data.concat(createChecksum(hrp, data, encoding))

    let ret = hrp + '1'
    for (let p = 0; p < combined.length; ++p) {
        ret += CHARSET.charAt(combined[p])
    }

    return ret
}

function createChecksum(hrp: Bech32Hrp, data: Bech32Data, encoding: Bech32Encoding): Bech32Checksum {
    const values = hrpExpand(hrp).concat(data).concat([0, 0, 0, 0, 0, 0])
    const mod = polymod(values) ^ getEncodingConst(encoding)

    const ret: Bech32Checksum = []
    for (let p = 0; p < 6; ++p) {
        ret.push((mod >> 5 * (5 - p)) & 31)
    }

    return ret
}
