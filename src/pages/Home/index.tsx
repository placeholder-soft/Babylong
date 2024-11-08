import { useCosmWasmSigningClient } from "graz"
import { useEffect } from "react"
import { signingOpts } from "../../constant"
import { Banner } from "./Banner"
import ConnectWallet from "./ConnectWallet"
import { WireKingHillView } from "./KingHillView"
import { WireListContent } from "./ListContentView"

export const HomePage = () => {
  const { data: signingClient } = useCosmWasmSigningClient({
    opts: signingOpts,
  })
  useEffect(() => {
    // query token list
    signingClient?.getContracts(82).then(res => {
      console.log("res", res)
    })
  }, [signingClient])
  return (
    <div>
      <Banner />
      <ConnectWallet />
      <WireListContent />
      <WireKingHillView />
    </div>
  )
}
