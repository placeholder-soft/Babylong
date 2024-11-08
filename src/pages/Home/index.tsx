import { useAccount, useCosmWasmSigningClient } from "graz"
import { useEffect } from "react"
import { Footer } from "../../components/footer"
import { signingOpts } from "../../constant"
import { Banner } from "./Banner"
import ConnectWallet from "./ConnectWallet"
import { WireKingHillView } from "./KingHillView"
import { WireListContent } from "./ListContentView"

export const HomePage = () => {
  const { isConnected } = useAccount()
  const { data: signingClient } = useCosmWasmSigningClient({
    opts: signingOpts,
  })
  useEffect(() => {
    if (!isConnected) return
    // query token list
    signingClient?.getContracts(82).then(res => {
      console.log("res", res)
    })
  }, [signingClient, isConnected])
  return (
    <div>
      <Banner />
      <ConnectWallet />
      <WireListContent />
      <WireKingHillView />
      <Footer />
    </div>
  )
}
