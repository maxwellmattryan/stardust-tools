export interface INativeNftBurnDeeplinkParameters { }
export interface INativeNftMintDeeplinkParameters { }
export interface INativeNftTransactionDeeplinkParameters { }

export interface INativeTokenBurnDeeplinkParameters { }
export interface INativeTokenMintDeeplinkParameters { }
export interface INativeTokenTransactionDeeplinkParameters { }

export interface IExpiryTransactionDeeplinkParameters { }
export interface IMicroTransactionDeeplinkParameters { }
export interface INormalTransactionDeeplinkParameters {
    amount: number
    recipientAddress: string

}

enum Protocol {
    IOTA = 'iota',
    Shimmer = 'shimmer',
}

interface IPaymentDeepLinkBuilder {
    buildExpiryTransaction(parameters: IExpiryTransactionDeeplinkParameters): string
    buildMicroTransaction(parameters: IMicroTransactionDeeplinkParameters): string
    buildNormalTransaction(parameters: INormalTransactionDeeplinkParameters): string
}

interface IDeepLinkBuilder extends IPaymentDeepLinkBuilder {
    // Native NFTs
    buildNativeNftBurn(parameters: INativeNftBurnDeeplinkParameters): string
    buildNativeNftMint(parameters: INativeNftMintDeeplinkParameters): string
    buildNativeNftTransaction(parameters: INativeNftTransactionDeeplinkParameters): string

    // Native Tokens
    buildNativeTokenBurn(parameters: INativeTokenBurnDeeplinkParameters): string
    buildNativeTokenMint(parameters: INativeTokenMintDeeplinkParameters): string
    buildNativeTokenTransaction(parameters: INativeTokenTransactionDeeplinkParameters): string
}

class PaymentDeepLinkBuilder implements IPaymentDeepLinkBuilder {
    buildExpiryTransaction(parameters: IExpiryTransactionDeeplinkParameters): string {
        console.log('PARAMETERS: ', parameters)
        return JSON.stringify(parameters)
    }
    buildMicroTransaction(parameters: IMicroTransactionDeeplinkParameters): string {
        console.log('PARAMETERS: ', parameters)
        return JSON.stringify(parameters)
    }
    buildNormalTransaction(parameters: INormalTransactionDeeplinkParameters): string {
        console.log('PARAMETERS: ', parameters)
        return JSON.stringify(parameters)
    }
}

export class DeepLinkBuilder implements IDeepLinkBuilder {
    private _protocol: Protocol
    private _paymentDeepLinkBuilder: IPaymentDeepLinkBuilder

    constructor() {
        this._protocol = Protocol.IOTA
        this._paymentDeepLinkBuilder = new PaymentDeepLinkBuilder()
    }

    // Native NFTs
    buildNativeNftBurn(parameters: INativeNftBurnDeeplinkParameters): string {
        console.log('PARAMETERS: ', parameters)
        return JSON.stringify(parameters)
    }
    buildNativeNftMint(parameters: INativeNftMintDeeplinkParameters): string {
        console.log('PARAMETERS: ', parameters)
        return JSON.stringify(parameters)
    }
    buildNativeNftTransaction(parameters: INativeNftTransactionDeeplinkParameters): string {
        console.log('PARAMETERS: ', parameters)
        return JSON.stringify(parameters)
    }

    // Native Tokens
    buildNativeTokenBurn(parameters: INativeTokenBurnDeeplinkParameters): string {
        console.log('PARAMETERS: ', parameters)
        return JSON.stringify(parameters)
    }
    buildNativeTokenMint(parameters: INativeTokenMintDeeplinkParameters): string {
        console.log('PARAMETERS: ', parameters)
        return JSON.stringify(parameters)
    }
    buildNativeTokenTransaction(parameters: INativeTokenTransactionDeeplinkParameters): string {
        console.log('PARAMETERS: ', parameters)
        return JSON.stringify(parameters)
    }

    // Payments
    buildExpiryTransaction(parameters: IExpiryTransactionDeeplinkParameters): string {
        return this._paymentDeepLinkBuilder.buildExpiryTransaction(parameters)
    }
    buildMicroTransaction(parameters: IMicroTransactionDeeplinkParameters): string {
        return this._paymentDeepLinkBuilder.buildMicroTransaction(parameters)
    }
    buildNormalTransaction(parameters: INormalTransactionDeeplinkParameters): string {
        return this._paymentDeepLinkBuilder.buildNormalTransaction(parameters)
    }
}
