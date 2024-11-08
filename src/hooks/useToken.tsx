import { useCosmWasmSigningClient } from "graz"
import { useEffect, useState } from "react"
import { signingOpts } from "../constant"
import { CombineTokenData, getToken } from "../service"

const getTokenName = (label: string) => {
  return label.replace("Bonding Token", "").trim()
}

export const useTokenInfo = (address: string | undefined) => {
  const { data: signingClient } = useCosmWasmSigningClient({
    opts: signingOpts,
  })
  const [tokenData, setTokenData] = useState<CombineTokenData | null>(null)
  useEffect(() => {
    if (!signingClient || !address) return
    (async () => {
      const name = getTokenName(address)
      const [tokenData, contractInfo] = await Promise.all([
        getToken(name),
        signingClient.getContract(address)
      ])
      setTokenData({ ...tokenData, ...contractInfo })
    })()
  }, [signingClient, address])
  return tokenData
}
