import { GasPrice } from "@cosmjs/stargate";
import {
  useAccount,
  useConnect,
  useCosmWasmSigningClient,
  useExecuteContract,
  useQuerySmart,
  WalletType,
} from "graz";
import { useEffect } from "react";

export const HomePage = () => {
  const { connect } = useConnect();
  const { isConnected, data: accountData } = useAccount();

  const contractAddress =
    "bbn1zvaspunr0n8nv42vvlrjtvlm767n7d0uxwn2xvv8wrszelm97w3s8s0tf7";

  const { data: tokenBalance } = useQuerySmart({
    address: contractAddress,
    queryMsg: {
      balance: {
        address: accountData?.bech32Address,
      },
    },
  });

  const { data: tokenPrice } = useQuerySmart({
    address: contractAddress,
    queryMsg: {
      curve_info: {},
    },
  });

  console.log("contractData", tokenBalance, tokenPrice);

  const { data: signingClient } = useCosmWasmSigningClient({
    opts: {
      gasPrice: GasPrice.fromString("0.012ubbn"),
    },
  });

  const { executeContract } = useExecuteContract({ contractAddress });
  useEffect(() => {
    // query token list
    signingClient?.getContracts(82).then((res) => {
      console.log("res", res);
    });
  }, [signingClient]);
  return (
    <div>
      home page
      {isConnected ? (
        accountData?.bech32Address
      ) : (
        <button
          onClick={() =>
            connect({
              chainId: "sat-bbn-testnet1",
              walletType: WalletType.LEAP,
            })
          }
        >
          Connect
        </button>
      )}
      <div
        className="mt-100"
        onClick={async () => {
          executeContract(
            {
              signingClient: signingClient!,
              msg: {
                create_bonding_token: { name: "NewBondToken", symbol: "NBT" },
              },
            },
            {
              onError: (err) => {
                console.log(err, "error");
              },
              onSuccess: (data) => {
                console.log(data);
              },
            }
          );
        }}
      >
        call contract
      </div>
      <div style={{ margin: 10 }}>buy</div>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={async () => {
          executeContract(
            {
              signingClient: signingClient!,
              msg: { buy: {} },
              funds: [{ denom: "ubbn", amount: "100" }], // 发送 100ubbn
            },
            {
              onError: (err) => {
                console.error("Buy transaction failed:", err);
              },
              onSuccess: (data) => {
                console.log("Buy transaction successful:", data);
              },
            }
          );
        }}
      >
        Buy Token
      </button>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={async () => {
          executeContract(
            {
              signingClient: signingClient!,
              msg: {
                burn: {
                  amount: "1",
                },
              },
            },
            {
              onError: (err) => {
                console.error("Sell transaction failed:", err);
              },
              onSuccess: (data) => {
                console.log("Sell transaction successful:", data);
              },
            }
          );
        }}
      >
        Sell Token
      </button>
    </div>
  );
};
