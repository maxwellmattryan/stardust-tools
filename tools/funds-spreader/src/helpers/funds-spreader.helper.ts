/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/ban-ts-comment */

// @ts-ignore
import { Promise } from 'bluebird'

import { AccountManager, CoinType } from '@iota/wallet'

import { ACCOUNT_FUNDS_SPREADER_SLEEP_INTERVAL } from '../constants'
import { IAccountFundsSpreaderParameters, IFundsSpreaderParameters } from '../interfaces'
import { sleep } from '../utils'

import { clearAccounts, createAndStoreAccounts, getAccountAtIndex, getAddressesForAccount } from './account.helper'
import { createStrongholdBackup, initialiseAccountManager } from './account-manager.helper'
import { getFaucetApiEndpoint, makeFaucetRequests } from './faucet.helper'
import { logInformationToConsole } from './logging.helper'

/**
 * Spreads funds to addresses of accounts of a particular seed.
 */
export async function spreadFunds(parameters: IFundsSpreaderParameters, round = 1): Promise<void> {
    const manager = await initialiseAccountManager(parameters, round)

    const highestAccountIndex = Math.max(
        ...parameters?.accountsFundsSpreaderParameters.map(
            (accountFundsSpreaderParameters) => accountFundsSpreaderParameters?.accountIndex
        )
    )
    await createAndStoreAccounts(highestAccountIndex + 1, manager)

    for (const accountFundsSpreaderParameters of parameters?.accountsFundsSpreaderParameters) {
        await spreadFundsForAccount(
            parameters?.mnemonic,
            parameters?.requestFundsFromFaucet,
            accountFundsSpreaderParameters,
            manager,
            parameters?.addressEncodingCoinType,
            round
        )
        await sleep(ACCOUNT_FUNDS_SPREADER_SLEEP_INTERVAL)
    }
    if (parameters?.backupToStrongholdFile) {
        await createStrongholdBackup(parameters, round, manager)
    }

    clearAccounts()
}

async function spreadFundsForAccount(
    mnemonic: string,
    requestFundsFromFaucet: boolean,
    parameters: IAccountFundsSpreaderParameters,
    manager: AccountManager,
    coinType: CoinType,
    round: number
): Promise<void> {
    const account = getAccountAtIndex(parameters?.accountIndex)
    const addresses = await getAddressesForAccount(parameters, account)

    if (requestFundsFromFaucet) {
        await makeFaucetRequests(getFaucetApiEndpoint(coinType), addresses)
    }

    logInformationToConsole(mnemonic, round, account?.meta?.index, addresses)
}
