import { CoinType } from '@iota/wallet'

import { IOTA_NODE_URL, SHIMMER_ALPHANET_NODE_URL, SHIMMER_TESTNET_NODE_URL } from '../constants'
import { NetworkType } from '../enums'

/**
 * Returns the corresponding node URL given the specific coin type.
 */
export function getNodeUrlFromCoinType(coinType: CoinType, networkType: NetworkType): string {
    switch (coinType) {
        case CoinType.IOTA:
            return IOTA_NODE_URL
        case CoinType.Shimmer:
            switch (networkType) {
                case NetworkType.Testnet:
                    return SHIMMER_TESTNET_NODE_URL
                case NetworkType.Alphanet:
                    return SHIMMER_ALPHANET_NODE_URL
                default:
                    return ''
            }
        default:
            return ''
    }
}
