import { GasPrice } from "@cosmjs/stargate"

export const saltplaer = {
  chainId: "sat-bbn-testnet1",
  chainName: "satlayer-babylon-testnet",
  rpc: "https://rpc.sat-bbn-testnet1.satlayer.net",
  rest: "https://lcd1.sat-bbn-testnet1.satlayer.net",
  stakeCurrency: {
    coinDenom: "BBN",
    coinMinimalDenom: "ubbn",
    coinDecimals: 6,
    coinGeckoId: "babylon",
  },
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: "bbn",
    bech32PrefixAccPub: "bbnpub",
    bech32PrefixValAddr: "bbnvaloper",
    bech32PrefixValPub: "bbnvaloperpub",
    bech32PrefixConsAddr: "bbnvalcons",
    bech32PrefixConsPub: "bbnvalconspub",
  },
  currencies: [
    {
      coinDenom: "BBN",
      coinMinimalDenom: "ubbn",
      coinDecimals: 6,
      coinGeckoId: "babylon",
    },
  ],
  gasPriceStep: {
    low: 0.01,
    average: 0.025,
    high: 0.03,
  },
  feeCurrencies: [
    {
      coinDenom: "BBN",
      coinMinimalDenom: "ubbn",
      coinDecimals: 6,
      coinGeckoId: "babylon",
      gasPriceStep: {
        low: 0.01,
        average: 0.025,
        high: 0.03,
      },
    },
  ],
}

export const signingOpts = {
  gasPrice: GasPrice.fromString("0.012ubbn"),
}
