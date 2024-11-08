import { GasPrice } from "@cosmjs/stargate";
import { useCosmWasmSigningClient, useExecuteContract } from "graz";
import { toast } from "react-toastify";
import { randomNanoid } from "../../utils/nanoid";
import CreateTokenIcon from "./assets/create-token.svg?react";
const FACTORY_ADDRESS =
  "bbn143qwq8ksje7t5mnulh8jawh5jzptnm8q2lr98sr9e6m4vg9dhrfqdhyq2z";

export const CreateToken = ({ className }: { className?: string }) => {
  const { data: signingClient } = useCosmWasmSigningClient({
    opts: {
      gasPrice: GasPrice.fromString("0.012ubbn"),
    },
  });
  const { executeContract } = useExecuteContract({
    contractAddress: FACTORY_ADDRESS,
  });

  const createToken = () => {
    if (!signingClient) {
      toast.error("Please connect your wallet first");
      return;
    }
    executeContract(
      {
        signingClient: signingClient!,
        msg: {
          create_bonding_token: {
            name: randomNanoid(),
            symbol: "NBT",
          },
        },
      },
      {
        onError: (err) => {
          console.log(err, "error");
        },
        onSuccess: (data) => {
          toast.success("Token created successfully");
          console.log(data);
        },
      }
    );
  };
  return (
    <button className={className} onClick={createToken}>
      <CreateTokenIcon />
    </button>
  );
};
