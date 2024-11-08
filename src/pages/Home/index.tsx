import { useAccount, useCosmWasmSigningClient } from "graz"
import { useEffect } from "react"
import { signingOpts } from "../../constant"
import { Banner } from "./Banner"
import { WireKingHillView } from "./KingHillView"
import { WireListContent } from "./ListContentView"
import { Footer } from "../../components/footer";



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
      <WireListContent />
      <WireKingHillView />
      <Footer />
    </div>
  );
};
