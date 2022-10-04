import { DEFAULT_DEEP_LINK_BUILDER_OPTIONS } from './constants'
import { NetworkProtocol } from './enums'
import {
    IClaimDeepLinkParameters,
    IDeepLinkBuilder,
    IDeepLinkBuilderOptions,
    ISendDeepLinkParameters,
} from './interfaces'
import { DeepLink } from './types'

export class DeepLinkBuilder implements IDeepLinkBuilder {
    private readonly _networkProtocol: NetworkProtocol

    constructor(options?: IDeepLinkBuilderOptions) {
        const { networkProtocol } = options ?? DEFAULT_DEEP_LINK_BUILDER_OPTIONS

        this._networkProtocol = this._validateNetworkProtocol(networkProtocol)
    }

    private _validateNetworkProtocol(networkProtocol: NetworkProtocol): NetworkProtocol {
        if (!networkProtocol || !Object.values(NetworkProtocol).includes(networkProtocol)) {
            throw new Error('Invalid network protocol (must be "iota" or "shimmer")')
        }

        return networkProtocol
    }

    public buildSendTransactionDeepLink(parameters?: ISendDeepLinkParameters): DeepLink {
        throw new Error('Method not implemented.')
    }

    public buildSendNormalTransactionDeepLink(recipient: string, amount: number): DeepLink {
        return `${this._networkProtocol}:wallet/send?recipient=${recipient}&amount=${amount}`
    }
    public buildSendMicroTransactionDeepLink(
        recipient: string,
        amount: number,
        storageDepositAmount: number,
        storageDepositReturnAddress: string
    ): DeepLink {
        return `${this._networkProtocol}:wallet/send?recipient=${recipient}&amount=${amount}&storageDepositAmount=${storageDepositAmount}&storageDepositReturnAddress=${storageDepositReturnAddress}`
    }
    public buildSendExpiryTransactionDeepLink(
        recipient: string,
        amount: number,
        expirationDate: number,
        expirationReturnAddress: string
    ): DeepLink {
        return `${this._networkProtocol}:wallet/send?recipient=${recipient}&amount=${amount}&expirationDate=${expirationDate}&expirationReturnAddress=${expirationReturnAddress}`
    }
    public buildSendTimelockTransactionDeepLink(recipient: string, amount: number, timelock: number): DeepLink {
        return `${this._networkProtocol}:wallet/send?recipient=${recipient}&amount=${amount}&timelock=${timelock}`
    }

    public buildClaimOutputsDeepLink(parameters?: IClaimDeepLinkParameters): DeepLink {
        const { outputIds } = parameters ?? { outputIds: [] }
        const outputIdsString = outputIds?.length === 1 ? outputIds[0] : outputIds.join(',')
        return `${this._networkProtocol}:wallet/claim?outputIds=${outputIdsString}`
    }
}
