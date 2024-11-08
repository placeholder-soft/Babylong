import { useAccount, useConnect, useDisconnect, WalletType } from "graz";
import { saltplaer } from "../../main";
import { getEllipsisAddress } from "../../utils/formatAddress";
import SearchIcon from "./assets/searchIcon.svg?react";
import WalletIcon from "./assets/wallet.svg?react";

export default function ConnectWallet() {
  const { connect } = useConnect();
  const { isConnected, data: accountData } = useAccount();
  const { disconnect } = useDisconnect();
  return (
    <div className="py-[32px] px-[7%] flex justify-center items-center bg-[#D90368]">
      <div className="flex items-center gap-2 flex-1">
        <SearchIcon />
        <input
          className="w-full ml-[32px] outline-none text-[32px] text-white uppercase bg-transparent placeholder:text-white"
          type="text"
          placeholder="Type token symbol, address to find your launchpad..."
        />
      </div>
      <div className="p-[24px] rounded-[73px] border-4 border-solid border-[#FFCA05] text-[#FFCA05] text-[32px] font-bold">
        {isConnected ? (
          <div className="flex items-center gap-2">
            <WalletIcon />
            {getEllipsisAddress(accountData?.bech32Address)}
            <button
              className="uppercase text-[24px] ml-4"
              onClick={() => disconnect()}
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button
            className="uppercase"
            onClick={() => {
              connect({
                chainId: saltplaer.chainId,
                walletType: WalletType.LEAP,
              });
            }}
          >
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
}
