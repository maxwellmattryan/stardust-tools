# `address-parser`

This library adheres to [TIP-0031](https://github.com/iotaledger/tips/blob/main/tips/TIP-0031/tip-0031.md), detailing specifics around Bech32 address formats with the IOTA ecosystem.

## How to Use

```typescript 
const parser = new AddressParser()

const result = parser.parseAddress('smr1zqc4nvg4ufcj3dkmzmd4uc034fx8pkz2nxl820a28mnsmxkec6ntwcu0ld0')
console.log(result)
// {
//  hrp: 'smr',
//  data: [
//     2,  0, 24, 21, 19, 12,  8, 21, 28,  9, 24, 18,
//    17, 13, 22, 27,  2, 27, 13, 21, 28, 24, 15, 17,
//    21,  9,  6,  7,  1, 22,  2, 10, 19,  6, 31,  7,
//    10, 15, 29, 10,  7, 27, 19, 16, 27,  6, 22, 25,
//    24, 26, 19, 11, 14
//  ],
//  checksum: 'cu0ld0',
//  type: 'nft'
}

if (parser.isValidAddress('smr1zthisisinvalidfcj3dkmzmd4uc034fx8pkz2nxl820a2as$$mxkec6ntwcu0ld0')) {
    // handle valid addresses
} else {
    // handle invalid addresses
}
```
