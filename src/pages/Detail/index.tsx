import {
  useAccount,
  useBalances,
  useCosmWasmSigningClient,
  useExecuteContract,
  useQuerySmart,
} from "graz"
import { useState } from "react"
import { useParams } from "react-router"
import { toast } from "react-toastify"
import { Footer } from "../../components/footer"
import { signingOpts } from "../../constant"
import { useTokenInfo } from "../../hooks/useToken"
import { formatUnits, parseUnits } from "../../utils/number"
import ButtonIcon from "./assets/button-icon.svg?react"
import DislikeIcon from "./assets/dislike-icon.svg?react"
import LeftTopIcon from "./assets/left-top-icon.svg?react"
import LikeIcon from "./assets/like-icon.svg?react"
import { Tab, TabType } from "./assets/Tab"

export default function Detail() {
  const { data: signingClient } = useCosmWasmSigningClient({
    opts: signingOpts,
  })
  const { data: accountData } = useAccount()
  const { data: balances } = useBalances()
  const { address } = useParams()
  const { executeContract } = useExecuteContract({ contractAddress: address! })

  useTokenInfo(address)

  const { data: tokenBalance } = useQuerySmart<{ balance: string }, string>({
    address,
    queryMsg: {
      balance: {
        address: accountData?.bech32Address,
      },
    },
  })

  const { data: tokenPrice } = useQuerySmart({
    address,
    queryMsg: {
      curve_info: {},
    },
  })
  console.log(tokenPrice, tokenBalance)
  const [activeTab, setActiveTab] = useState<TabType>(TabType.BUY)
  const [amount, setAmount] = useState("")

  const voteList = [
    {
      num: 100,
      icon: <LikeIcon />,
    },
    {
      num: 100,
      icon: <DislikeIcon />,
    },
  ]

  const isBuy = activeTab === TabType.BUY

  const setMax = () => {
    if (isBuy) {
      const bbnBalance = balances?.find(item => item.denom === "ubbn")?.amount
      setAmount(formatUnits(bbnBalance, 6))
    } else {
      setAmount(formatUnits(tokenBalance?.balance, 6))
    }
  }

  const handleBuy = () => {
    console.log("buy", [{ denom: "ubbn", amount: parseUnits(amount, 6) }])
    executeContract(
      {
        signingClient: signingClient!,
        msg: { buy: {} },
        funds: [{ denom: "ubbn", amount: parseUnits(amount, 6) }],
      },
      {
        onError: err => {
          console.error("Buy transaction failed", err)
        },
        onSuccess: () => {
          toast.success("Buy transaction successful")
        },
      },
    )
  }

  const handleSell = () => {
    if (tokenBalance?.balance === "0") {
      toast.error("You have no this token balance")
      return
    }
    executeContract(
      {
        signingClient: signingClient!,
        msg: {
          burn: {
            amount: parseUnits(amount, 6),
          },
        },
      },
      {
        onError: err => {
          console.error("Sell token failed", err)
        },
        onSuccess: () => {
          toast.success("Sell token successful")
        },
      },
    )
  }

  const handleClick = () => {
    if (!signingClient) {
      toast.error("Please connect wallet")
      return
    }
    if (amount === "" || amount === "0") {
      toast.error("Please enter the amount")
      return
    }
    if (isBuy) {
      handleBuy()
    } else {
      handleSell()
    }
  }

  return (
    <div className="flex h-screen flex-col bg-[#dc145c]">
      <div className="flex w-full flex-1 items-center justify-center">
        <div className="relative flex h-3/4 w-3/4 rounded-[24px] border-4 border-solid border-black bg-white">
          <LeftTopIcon className="absolute -left-[130px] -top-[130px]" />
          <div className="flex flex-1 flex-col justify-center border-r border-solid border-black p-[40px]">
            <img
              className="w-full"
              src={
                "https://st2.depositphotos.com/1520573/11556/v/450/depositphotos_115567992-stock-illustration-july-05-2016-the-character.jpg"
              }
              alt="icon"
            />
            <div className="mx-auto mt-[40px] flex w-5/6 justify-between">
              {voteList.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="mr-2 text-[32px] font-semibold">
                    {item.num}
                  </span>
                  {item.icon}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-[2] flex-col justify-between p-[40px]">
            <div className="mb-[40px]">
              <div className="flex items-center justify-between text-[18px] leading-[140%] text-black">
                <div>
                  Created by <span className="underline">xxx</span>
                </div>
                <div>07/11/2024&nbsp;|&nbsp;19:40</div>
              </div>
              <div className="mt-2 text-[18px] leading-[140%] text-[#D90368]">
                Market cap <span className="font-semibold">47.50k</span>
              </div>
              <h2 className="mt-[40px] text-[36px] font-[900] uppercase leading-[100%]">
                {"Freedom Squad (ticker: FSQUAD)"}
              </h2>
              <p className="mt-2 text-[16px] leading-[140%] text-black opacity-70">
                Just because Trump won the election, doesn’t mean the work is
                over. The fight for freedom continues! Will you be on the right
                side of history? Join the Freedom Squad FSQUAD today! The fight
                for freedom continues! Will you be on the right side of history?
                Join the Freedom Squad FSQUAD today!
              </p>
            </div>
            <div className="pb-[40px]">
              <Tab activeTab={activeTab} onChange={setActiveTab} />
              <div className="mb-6 mt-10 flex justify-between text-[18px] font-bold leading-[140%]">
                <span className="text-[#D90368]">SWITCH TO FSQUAD</span>
                <span className="cursor-pointer underline" onClick={setMax}>
                  Max
                </span>
              </div>
              <div className="flex items-center justify-between rounded-[9px] border-4 border-solid border-[#E6E6E6] px-[24px] py-[16px] text-[32px]">
                <input
                  type="number"
                  placeholder="0.0"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  className="h-[45px] flex-1 border-none text-[32px] font-bold outline-none placeholder:text-black"
                />
                {isBuy && (
                  <span className="ml-4 leading-[140%] text-black">BBN</span>
                )}
              </div>
              <div
                onClick={handleClick}
                className={`mt-6 flex cursor-pointer items-center justify-center rounded-[13px] border-[3px] border-solid border-black bg-[#FFCA05] px-[24px] py-[16px] text-[32px] font-[900] uppercase shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]`}
              >
                {isBuy ? "BUY" : "SELL"} Token
                <ButtonIcon className="ml-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
