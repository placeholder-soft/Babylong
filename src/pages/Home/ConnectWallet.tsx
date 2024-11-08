import { useAccount, useConnect, useDisconnect, WalletType } from "graz"
import { saltplaer } from "../../constant"
import { useSearch } from "../../context/SearchContext"
import { getEllipsisAddress } from "../../utils/formatAddress"
import SearchIcon from "./assets/searchIcon.svg?react"
import WalletIcon from "./assets/wallet-icon.svg?react"

export default function ConnectWallet() {
  const { connect } = useConnect()
  const { isConnected, data: accountData } = useAccount()
  const { disconnect } = useDisconnect()
  const { searchValue, setSearchValue } = useSearch()

  const handleConnect = async () => {
    try {
      const leap = window.leap
      if (!leap?.experimentalSuggestChain) {
        throw new Error("Please update your Leap wallet")
      }
      try {
        await leap.experimentalSuggestChain(saltplaer)
      } catch (err) {
        console.log("Chain might already exist:", err)
      }

      connect({
        chainId: saltplaer.chainId,
        walletType: WalletType.LEAP,
      })
    } catch (error) {
      console.error("Failed to connect:", error)
    }
  }
  return (
    <div className="absolute bottom-[0px] flex w-full items-center justify-center gap-4 border-t border-solid border-[#D6d6d6] bg-[#D90368] px-[7%] py-[32px]">
      <div className="flex flex-1 items-center gap-2">
        <SearchIcon />
        <input
          value={searchValue}
          className="ml-[32px] w-full bg-transparent text-[32px] uppercase text-white outline-none placeholder:text-white"
          type="text"
          placeholder="Type token symbol, address to find your launchpad..."
          onChange={e => setSearchValue(e.target.value)}
        />
      </div>
      <div className="rounded-[73px] border-4 border-solid border-[#FFCA05] bg-[#C5005D] p-[32px] text-[32px] font-bold leading-[100%] text-[#FFCA05]">
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
          <button className="uppercase" onClick={handleConnect}>
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  )
}
