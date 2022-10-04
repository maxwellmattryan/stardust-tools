import { DeepLink } from '../types'

import { IClaimDeepLinkParameters, ISendDeepLinkParameters } from './parameters'

export interface IDeepLinkBuilder {
    // Wallet
    buildSendTransactionDeepLink(parameters?: ISendDeepLinkParameters): DeepLink
    buildSendMicroTransactionDeepLink(parameters?: ISendDeepLinkParameters): DeepLink
    buildSendExpiryTransactionDeepLink(parameters?: ISendDeepLinkParameters): DeepLink
    buildSendTimelockTransactionDeepLink(parameters?: ISendDeepLinkParameters): DeepLink
    buildClaimOutputsDeepLink(parameters?: IClaimDeepLinkParameters): DeepLink

    // // Foundry
    // buildMintNativeTokenDeepLink(): DeepLink
    // buildMintNativeNftDeepLink(): DeepLink
    // buildBurnNativeTokenDeepLink(): DeepLink
    // buildBurnNativeNftDeepLink(): DeepLink
    //
    // // Governance
    // buildVotingTransactionDeepLink(): DeepLink
}
