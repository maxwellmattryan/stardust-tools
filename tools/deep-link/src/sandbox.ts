import { DeepLinkBuilder } from './deep-link-builder'

function runDeepLink(): void {
    const deepLinkBuilder = new DeepLinkBuilder()
    console.log(
        deepLinkBuilder.buildSendNormalTransactionDeepLink(
            'iota1qrhacyfwlcnzkvzteumekfkrrwks98mpdm37cj4xx3drvmjvnep6xqgyzyx',
            4201337
        )
    )
}

runDeepLink()
