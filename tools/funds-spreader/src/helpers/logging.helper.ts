import { Address } from '@iota/wallet'

/**
 * Array to keep track of what funds spreader runds have already been logged.
 */
const loggedFundsSpreaderRounds: number[] = []

/**
 * Logs information to the console in specific formatting to increase readability.
 */
export function logInformationToConsole(
    mnemonic: string,
    round: number,
    accountIndex: number,
    addresses: Address[]
): void {
    if (!loggedFundsSpreaderRounds.includes(round)) {
        console.log(`Fund Spreader No. ${round}`)
        console.log(mnemonic, '\n')
        loggedFundsSpreaderRounds.push(round)
    }
    console.log(`\tAccount ${accountIndex}:`)
    addresses.forEach((address) => {
        console.log(`\t\tAddress ${address?.keyIndex}: ${address?.address}`)
    })
    console.log()
}
