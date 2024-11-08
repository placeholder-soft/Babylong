import { useAccount } from "graz";
import { getEllipsisAddress } from "../../utils/formatAddress";
import banner from "./assets/banner.png";
import WalletIcon from "./assets/wallet.svg?react";

export default function ConnectWallet() {
  const { isConnected, data: accountData } = useAccount();
  return (
    <div className="relative">
      <img src={banner} alt="banner" className="w-full h-full" />
      <div className="p-[32px] rounded-[73px]  border-4 border-solid border-[#FFCA05] absolute right-[10%] bottom-[3%] text-[#FFCA05] text-[42px] font-bold ">
        {isConnected ? (
          <div className="flex items-center gap-2">
            <WalletIcon />
            {getEllipsisAddress(accountData?.bech32Address)}
          </div>
        ) : (
          <button className="uppercase ">Connect Wallet</button>
        )}
      </div>
    </div>
  );
}
