import { NetworkProtocol } from './enums'
import { IClaimDeepLinkParameters,
    IDeepLinkBuilder,
    IDeepLinkBuilderOptions,
    ISendDeepLinkParameters
} from './interfaces'
import { DeepLink } from './types'

export class DeepLinkBuilder implements IDeepLinkBuilder {
    private _protocol: NetworkProtocol

    constructor(options?: IDeepLinkBuilderOptions) {
        console.log('OPTIONS: ', options)

        this._protocol = options?.networkProtocol ?? NetworkProtocol.Shimmer
    }

    buildSendTransactionDeepLink(parameters?: ISendDeepLinkParameters): DeepLink {
        console.log('PARAMETERS: ', parameters)
        console.log('PARSED: ', qs.parse(parameters))

        return ''
    }
    buildSendMicroTransactionDeepLink(parameters?: ISendDeepLinkParameters): DeepLink {
        throw new Error('Method not implemented.')
    }
    buildSendExpiryTransactionDeepLink(parameters?: ISendDeepLinkParameters): DeepLink {
        throw new Error('Method not implemented.')
    }
    buildSendTimelockTransactionDeepLink(parameters?: ISendDeepLinkParameters): DeepLink {
        throw new Error('Method not implemented.')
    }
    buildClaimOutputsDeepLink(parameters?: IClaimDeepLinkParameters): DeepLink {
        throw new Error('Method not implemented.')
    }
}
