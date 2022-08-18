/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/ban-ts-comment */

// @ts-ignore
import { Promise } from 'bluebird'

import { Account, AccountManager, Address } from '@iota/wallet'
import { IAccountFundsSpreaderParameters } from '../interfaces'

let accounts: Account[] = []

export async function createAccounts(numberOfAccounts: number, manager: AccountManager): Promise<void> {
    const emptyArrayOfIndices = Array.from({ length: numberOfAccounts })
    await Promise.all(
        emptyArrayOfIndices.map(async () => {
            const account = await manager?.createAccount({})
            accounts.push(account)
        })
    )
}

export function clearAccounts(): void {
    accounts = []
}

export function getAccountAtIndex(index: number): Account | undefined {
    return accounts.find((account) => account?.meta?.index === index)
}

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
