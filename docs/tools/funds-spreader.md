---
icon: credit-card
---

# Funds Spreader

If you haven't already, please see [Getting Started](../getting-started.md) before using trying this tool out.

:::caution
The tool does **NOT** currently work for the IOTA devnet.
:::

## How it Works

Simply put, the funds spreader tool...

1. Reads in a mnemonic from `stardust-tools/tools/funds-spreader/.env` and generates accounts and addresses at specific indices
2. Requests funds from a faucet to every generated address
3. Creates a Stronghold backup in `stardust-tools/tools/funds-spreader/temp/backups`

Please [see below](#parameters) for more detail on the available parameters.

## How to Use

### Before Using

Before using the funds spreader, you **MUST** configure your `.env` file:

1. Copy the `.env.example` file located in [`stardust-tools/tools/funds-spreader/.env.example`](https://github.com/maxwellmattryan/stardust-tools/blob/develop/tools/funds-spreader/.env.example){target=\_blank} and rename to `.env`
2. Fill in each line where there is a blank string with a mnemonic (ideally different ones but could also be the same)

:::danger
Although this tool **NEVER** uses a mainnet node, it is **NOT** recommended to use a mnemonic where real funds reside. **Please proceed at your own risk**.
:::

```bash
# stardust-tools/tools/funds-spreader/.env

MNEMONIC_001="kind kidney lottery soon ball trade nest interest latin joke oval acoustic badge engine ship chunk address front art dog wine toilet casual cost"
MNEMONIC_002="sport moon venture frozen deposit limb civil buzz remain recall mercy monitor soldier elbow lemon make motor observe inform hip coffee bacon eye way"
...
```

:::info
This [BIP39 mnemonic generator](https://iancoleman.io/bip39/){target=_blank} is a useful tool for quickly creating valid mnemonics (be sure to use 24 words).
:::

### Running

```bash
# in stardust-tools root directory
yarn tool:funds-spreader

# in stardust-tools/tools/funds-spreader
yarn execute
```

:::caution
Please be sure that your `.env` file mnemonics are set before running the tool, or else you **WILL** receive an error.
:::

The output will look something like this:

```bash
Fund Spreader No. 1
gossip disease allow they receive elegant foster tent iron explain bunker apology boring organ best system hospital ginger volcano chief catalog oval usual theme

        Account 0:
                Address 0: rms1qqmcf78qr9rzqxrafek2dukenp5yw8mlzsqt87sdj4g2wzvjax3x6ectee0
                Address 1: rms1qpv9e5vah0ykzeyuz9ss5f7mptgu4lvtw686atv73z37amvp4zyq7tpgndy

Fund Spreader No. 2
whisper bench borrow aware luxury cool ecology orchard certain urban force cradle detail minute emotion roof trophy enhance sadness meadow ignore merry before blanket

        Account 0:
                Address 5: rms1qrnvp36mzhjqytdy73dm0smkxejaz6v8tuqga8a3vs96ttzfu23ls92ucca
                Address 10: rms1qqlm3q6ltl8kq852636lqm9tjndqzmaan93wwup4gp28ve9gqwudyy660ay

...
```

### Parameters

The funds spreader takes an array of objects (specifically [`IFundsSpreaderParameters[]`](https://github.com/maxwellmattryan/stardust-tools/blob/develop/tools/funds-spreader/src/interfaces/funds-spreader-parameters.interface.ts#L8){target=\_blank}) where each `IFundsSpreaderParameters` element contains the following arguments:

Required:

-   `mnemonic`: the seed used to generate the particular addresses
-   `addressDerivationCoinType`: the `coin_type` to use in the BIP32 path, e.g. `4218` (IOTA) or `4219` (Shimmer)
-   `addressEncodingCoinType`: the `coin_type`[^1] corresponding to the Bech32 HRP that is used in encoding the Ed25519 address, e.g. `atoi` or `rms`[^2]
-   `accountsFundsSpreadersParameters[]`: an array of per-account parameter objects that contain an `accountIndex` and an array of `addressIndicesWithFunds`

Optional:

- `networkType`: a specific network, i.e. `testnet` or `alphanet`, testnet by default

    :::info
    If the testnet is busy, sometimes the faucet will error when making requests. Simply change [this line](https://github.com/maxwellmattryan/stardust-tools/blob/develop/tools/funds-spreader/src/constants/funds-spreaders-parameters/shimmer-claiming-funds-spreaders-parameters.ts#L176){target=_blank} to use the alphanet and try again.
    :::

- `requestFundsFromFaucet`: a boolean value to indicate whether or not to actually send fund requests to the faucet, `true` by default

    :::caution
    If you receive a `400`, `429`, or even a `500` error when this is set to `true`, please adjust the sleep intervals constants (see [here](https://github.com/maxwellmattryan/stardust-tools/blob/develop/tools/funds-spreader/src/constants/sleep.constants.ts){target=_blank}).
    :::

- `backupToStrongholdFile`: a boolean value to indicate whether or not to backup each profile / account manager to a specific Stronghold backup file, `true` by default

    :::info
    The Stronghold backup files are located in the `stardust-tools/tools/funds-spreader/temp/backups` directory, which is created or overwritten when running the tool.
    :::

#### Shimmer Claiming

By default, the tool is setup to use the specific parameters for Shimmer claiming (reason being that this tool was originally created for testing this functionality in Firefly).

Those parameters are located in [`stardust-tools/tools/funds-spreader/src/constants/funds-spreaders-parameters`](https://github.com/maxwellmattryan/stardust-tools/tree/develop/tools/funds-spreader/src/constants/funds-spreaders-parameters){target=\_blank}.

:::info
If you wish to change the `coin_type` parameter that the addresses are _derived_ (**NOT** _encoded_ as Stardust hasn't yet reached IOTA) with, then please edit [this line](https://github.com/maxwellmattryan/stardust-tools/blob/develop/tools/funds-spreader/src/constants/funds-spreaders-parameters/shimmer-claiming-funds-spreaders-parameters.ts#L173){target=\_blank}.
:::

#### Custom Scenarios

In some cases, it will be easier to create a new funds spreaders parameters file rather than editing an existing one.

Use the following steps to make sure the funds spreader works properly when using with custom scenarios:

1. Create a new TypeScript file in `stardust-tools/tools/funds-spreader/src/constants/funds-spreaders-parameters`
2. Properly declare and define a variable of type `IFundsSpreaderParameters[]` with the specific configuration
3. Barrel export your newly created file by adding another line in [`stardust-tools/tools/funds-spreader/src/constants/funds-spreaders-parameters/index.ts`](https://github.com/maxwellmattryan/stardust-tools/blob/develop/tools/funds-spreader/src/constants/funds-spreaders-parameters/index.ts){target=\_blank}
4. In `stardust-tools/tools/funds-spreader/src/main.ts`, please change [this line](https://github.com/maxwellmattryan/stardust-tools/blob/develop/tools/funds-spreader/src/main.ts#L9){target=\_blank}

[^1]:
The `coin_type` parameter is **NOT** technically relevant to how the address is encoded (that is determined by the Bech32 HRP), only derived.
It used simply used here for convenience as both a user and developer of this tool.

[^2]:
Due to the way the funds spreader works (requesting funds from a faucet rather than making transfers of your own funds), it will **NOT** work for any mainnet funds (IOTA _or_ SMR).
Although this is a potential feature to add in the future, e.g. a `FundsSpreaderStrategy` that indicates how exactly to "spread funds" amongst addresses.
