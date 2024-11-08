import { useAccount, useConnect, useDisconnect, WalletType } from "graz"
import { saltplaer } from "../../constant"
import { getEllipsisAddress } from "../../utils/formatAddress"
import SearchIcon from "./assets/searchIcon.svg?react"
import WalletIcon from "./assets/wallet-icon.svg?react"

export default function ConnectWallet() {
  const { connect } = useConnect()
  const { isConnected, data: accountData } = useAccount()
  const { disconnect } = useDisconnect()
  return (
    <div className="flex items-center justify-center bg-[#D90368] px-[7%] py-[32px]">
      <div className="flex flex-1 items-center gap-2">
        <SearchIcon />
        <input
          className="ml-[32px] w-full bg-transparent text-[32px] uppercase text-white outline-none placeholder:text-white"
          type="text"
          placeholder="Type token symbol, address to find your launchpad..."
        />
      </div>
      <div className="rounded-[73px] border-4 border-solid border-[#FFCA05] p-[24px] text-[32px] font-bold text-[#FFCA05]">
        {isConnected ? (
          <div className="flex items-center gap-2">
            <WalletIcon />
            {getEllipsisAddress(accountData?.bech32Address)}
            <button
              className="ml-4 text-[24px] uppercase"
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
              })
            }}
          >
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  )
}
