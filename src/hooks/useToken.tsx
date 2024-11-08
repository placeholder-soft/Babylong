import { useCosmWasmSigningClient } from "graz"
import { useEffect } from "react"
import { signingOpts } from "../constant"

const getTokenName = (label: string) => {
  return label.replace("Bonding Token", "").trim()
}

export const useTokenInfo = (address: string | undefined) => {
  const { data: signingClient } = useCosmWasmSigningClient({
    opts: signingOpts,
  })
  useEffect(() => {
    if (!signingClient || !address) return
    signingClient.getContract(address).then(res => {
      const name = getTokenName(res.label)
      console.log("name", name)
    })
  }, [signingClient, address])
}
