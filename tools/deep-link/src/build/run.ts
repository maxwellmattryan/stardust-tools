import { DeepLinkBuilder, INormalTransactionDeeplinkParameters } from './builder'

export function runDeepLinkBuilder(): void {
    const builder = new DeepLinkBuilder()

    const normalTransactionDeepLinkParameters: INormalTransactionDeeplinkParameters = {

    }
    const normalTransactionDeepLink =builder.buildNormalTransaction({})
}

runDeepLinkBuilder()
