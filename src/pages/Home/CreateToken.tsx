import { useCosmWasmSigningClient, useExecuteContract } from "graz"
import { toast } from "react-toastify"
import { signingOpts } from "../../constant"
import { env } from "../../env"
import { randomNanoid } from "../../utils/nanoid"
import CreateTokenIcon from "./assets/create-token.svg?react"
import { useNavigate } from "react-router"

export const CreateToken = ({ className }: { className?: string }) => {
  // const { data: signingClient } = useCosmWasmSigningClient({
  //   opts: signingOpts,
  // })
  // const { executeContract } = useExecuteContract({
  //   contractAddress: env.VITE_FACTORY_ADDRESS,
  // })

  // const createToken = () => {
  //   if (!signingClient) {
  //     toast.error("Please connect your wallet first")
  //     return
  //   }
  //   executeContract(
  //     {
  //       signingClient: signingClient!,
  //       msg: {
  //         create_bonding_token: {
  //           name: randomNanoid(),
  //           symbol: "NBT",
  //         },
  //       },
  //     },
  //     {
  //       onError: err => {
  //         console.log(err, "error")
  //       },
  //       onSuccess: data => {
  //         toast.success("Token created successfully")
  //         console.log(data)
  //       },
  //     },
  //   )
  // }
  const navigate = useNavigate()

  return (
    <button className={className} onClick={() => navigate("/create-token")}>
      <CreateTokenIcon />
    </button>
  )
}
