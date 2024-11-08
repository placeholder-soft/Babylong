import banner from "./assets/banner.svg"
import ConnectWallet from "./ConnectWallet"
import { CreateToken } from "./CreateToken"
export const Banner = () => {
  return (
    <div className="relative">
      <img src={banner} alt="banner" className="h-full w-full" />
      <CreateToken className="absolute bottom-[15%] right-[7%]" />
      <ConnectWallet />
    </div>
  )
}
