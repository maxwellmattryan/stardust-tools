import { Address, NativeTokenId, Recipient } from '../../types'

export interface ISendDeepLinkParameters {
    recipient: Recipient
    amount: number
    expirateDate?: number
    expirationReturnAddress?: Address
    nativeTokenId?: NativeTokenId
    nativeTokenAmount?: number
    storageDepositAmount?: number
    storageDepositReturnAddress?: Address
    timelock?: number
}
