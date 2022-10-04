import { Address, DeepLink, OutputId, Recipient } from '../types'

import { IClaimDeepLinkParameters, ISendDeepLinkParameters } from './parameters'

export interface IDeepLinkBuilder {
    // Wallet
    buildSendTransactionDeepLink(parameters?: ISendDeepLinkParameters): DeepLink

    buildSendNormalTransactionDeepLink(recipient: Recipient, amount: number): DeepLink
    buildSendMicroTransactionDeepLink(
        recipient: Recipient,
        amount: number,
        storageDepositAmount: number,
        storageDepositReturnAddress: Address
    ): DeepLink
    buildSendExpiryTransactionDeepLink(
        recipient: Recipient,
        amount: number,
        expirationDate: number,
        expirationReturnAddress: Address
    ): DeepLink
    buildSendTimelockTransactionDeepLink(recipient: Recipient, amount: number, timelock: number): DeepLink

    // TODO: Should this argument be spread?
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
