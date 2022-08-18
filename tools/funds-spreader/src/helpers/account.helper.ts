/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/ban-ts-comment */

// @ts-ignore
import { Promise } from 'bluebird'

import { Account, AccountManager, Address } from '@iota/wallet'
import { IAccountFundsSpreaderParameters } from '../interfaces'

let accounts: Account[] = []

/**
 * Creates a specific number of accounts, storing them to be used later.
 */
export async function createAndStoreAccounts(numberOfAccounts: number, manager: AccountManager): Promise<void> {
    const emptyArrayOfIndices = Array.from({ length: numberOfAccounts })
    await Promise.all(
        emptyArrayOfIndices.map(async () => {
            const account = await manager?.createAccount({})
            accounts.push(account)
        })
    )
}

/**
 * Empties any previously stored accounts.
 */
export function clearAccounts(): void {
    accounts = []
}

/**
 * Retrieves an account of a specific index, so
 * long as it has been created and stored.
 */
export function getAccountAtIndex(index: number): Account | undefined {
    return accounts.find((account) => account?.meta?.index === index)
}

/**
 * Retrieves the addresses of an account as specified
 * by the given account funds spreader parameters
 */
export async function getAddressesForAccount(
    parameters: IAccountFundsSpreaderParameters,
    account: Account
): Promise<Address[]> {
    const highestAddressIndex = Math.max(...parameters?.addressIndicesWithFunds)
    if (highestAddressIndex < 0) return []

    const addressesBeyondIndexZero = await account?.generateAddresses(highestAddressIndex)
    const addressAtIndexZero = account?.meta?.publicAddresses[0]
    const addresses = [addressAtIndexZero, ...addressesBeyondIndexZero]
    return addresses.filter((address) => parameters?.addressIndicesWithFunds.includes(address?.keyIndex))
}
