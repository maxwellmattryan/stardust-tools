import { CoinType } from '@iota/wallet'

import { IFundsSpreaderParameters } from '../../interfaces'
import { NetworkType } from '../../enums'

/**
 * The specific funds spreaders parameters for Shimmer claiming testing.
 */
export const SHIMMER_CLAIMING_FUNDS_SPREADERS_PARAMETERS: IFundsSpreaderParameters[] = [
    // 1. Unclaimed Shimmer tokens on one account (index `0`) and one or more addresses (index `0`)
    {
        mnemonic: process.env.MNEMONIC_001,
        accountsFundsSpreaderParameters: [
            {
                accountIndex: 4,
                addressIndicesWithFunds: [51],
            },
        ],
    },
    // 2. Unclaimed Shimmer tokens on one account (index `0`) and one or more addresses (index `1+`)
    {
        mnemonic: process.env.MNEMONIC_002,
        accountsFundsSpreaderParameters: [
            {
                accountIndex: 12,
                addressIndicesWithFunds: [12, 129],
            },
        ],
    },
    // 3. Unclaimed Shimmer tokens on one account (index `1+`) and one or more addresses (index `0`)
    {
        mnemonic: process.env.MNEMONIC_003,
        accountsFundsSpreaderParameters: [
            {
                accountIndex: 13,
                addressIndicesWithFunds: [0, 51],
            },
        ],
    },
    // 4. Unclaimed Shimmer tokens on one account (index `1+`) and one or more addresses (index `1+`)
    {
        mnemonic: process.env.MNEMONIC_004,
        accountsFundsSpreaderParameters: [
            {
                accountIndex: 2,
                addressIndicesWithFunds: [130],
            },
        ],
    },
    // 5. Unclaimed Shimmer tokens on many accounts (index `0-n`) and one or more addresses (index `0`) for each account
    {
        mnemonic: process.env.MNEMONIC_005,
        accountsFundsSpreaderParameters: [
            {
                accountIndex: 0,
                addressIndicesWithFunds: [0],
            },
            {
                accountIndex: 1,
                addressIndicesWithFunds: [21],
            },
            {
                accountIndex: 3,
                addressIndicesWithFunds: [90],
            },
        ],
    },
    // 6. Unclaimed Shimmer tokens on many accounts (index `0-n`) and one or more addresses (index `1+`) for each account
    {
        mnemonic: process.env.MNEMONIC_006,
        accountsFundsSpreaderParameters: [
            {
                accountIndex: 0,
                addressIndicesWithFunds: [1, 2],
            },
            {
                accountIndex: 3,
                addressIndicesWithFunds: [5, 10],
            },
            {
                accountIndex: 11,
                addressIndicesWithFunds: [0],
            },
            {
                accountIndex: 12,
                addressIndicesWithFunds: [21],
            },
        ],
    },
    // 7. Unclaimed Shimmer tokens on many accounts (index `1-n`) and one or more addresses (index `0`) for each account
    {
        mnemonic: process.env.MNEMONIC_007,
        accountsFundsSpreaderParameters: [
            {
                accountIndex: 2,
                addressIndicesWithFunds: [0],
            },
            {
                accountIndex: 3,
                addressIndicesWithFunds: [0, 1],
            },
            {
                accountIndex: 5,
                addressIndicesWithFunds: [0, 1],
            },
        ],
    },
    // 8. Unclaimed Shimmer tokens on many accounts (index `1-n`) and one or more addresses (index `1+`) for each account
    {
        mnemonic: process.env.MNEMONIC_008,
        accountsFundsSpreaderParameters: [
            {
                accountIndex: 2,
                addressIndicesWithFunds: [1, 2],
            },
            {
                accountIndex: 3,
                addressIndicesWithFunds: [5, 10],
            },
            {
                accountIndex: 5,
                addressIndicesWithFunds: [10],
            },
        ],
    },
    // 9. Scenarios 1-8 except some Shimmer tokens have already been claimed on only one account (random index)
    // {
    //     mnemonic: process.env.MNEMONIC_009,
    //     accountsFundsSpreaderParameters: [
    //         {
    //             accountIndex: 0,
    //             addressIndicesWithFunds: [0],
    //         },
    //     ],
    // },
    // // 10. Scenarios 1-8 except some Shimmer tokens have already been claimed on more than one account
    // {
    //     mnemonic: process.env.MNEMONIC_010,
    //     accountsFundsSpreaderParameters: [
    //         {
    //             accountIndex: 0,
    //             addressIndicesWithFunds: [0],
    //         },
    //     ],
    // },
    // // 11. Scenarios 1-8 except all Shimmer tokens have already been claimed on only one account (random index)
    // {
    //     mnemonic: process.env.MNEMONIC_011,
    //     accountsFundsSpreaderParameters: [
    //         {
    //             accountIndex: 0,
    //             addressIndicesWithFunds: [0],
    //         },
    //     ],
    // },
    // // 12. Scenarios 1-8 except all Shimmer tokens have already been claimed on all accounts
    // {
    //     mnemonic: process.env.MNEMONIC_012,
    //     accountsFundsSpreaderParameters: [
    //         {
    //             accountIndex: 0,
    //             addressIndicesWithFunds: [0],
    //         },
    //     ],
    // },
    // // 13. Any of the above with a Ledger device where there are too many outputs
    // {
    //     mnemonic: process.env.MNEMONIC_013,
    //     accountsFundsSpreaderParameters: [
    //         {
    //             accountIndex: 0,
    //             addressIndicesWithFunds: [0],
    //         },
    //     ],
    // },
].map((fundsSpreaderParameters) => ({
    ...fundsSpreaderParameters,
    addressDerivationCoinType: CoinType.IOTA,
    addressEncodingCoinType: CoinType.Shimmer,
    networkType: NetworkType.Testnet,
    requestFundsFromFaucet: true,
    backupToStrongholdFile: true,
}))
