import {
  useAccount,
  useBalances,
  useCosmWasmSigningClient,
  useExecuteContract,
  useQuerySmart,
} from "graz"
import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { toast } from "react-toastify"
import { Footer } from "../../components/footer"
import { signingOpts } from "../../constant"
import { useTokenData } from "../../hooks/useToken"
import { formatDate, formatTime } from "../../utils/date"
import { getEllipsisAddress } from "../../utils/formatAddress"
import { formatUnits, parseUnits } from "../../utils/number"
import ButtonIcon from "./assets/button-icon.svg?react"
import DislikeIcon from "./assets/dislike-icon.svg?react"
import LeftTopIcon from "./assets/left-top-icon.svg?react"
import LikeIcon from "./assets/like-icon.svg?react"
import { Tab, TabType } from "./assets/Tab"

export interface TokenPrice {
  reserve: string
  reserve_denom: string
  spot_price: string
  supply: string
}

interface VoteData {
  likes: number;
  dislikes: number;
}

export default function Detail() {
  const { data: signingClient } = useCosmWasmSigningClient({
    opts: signingOpts,
  })
  const { data: accountData } = useAccount()
  const { data: balances } = useBalances()
  const { address } = useParams()
  const { executeContract } = useExecuteContract({ contractAddress: address! })

  const tokenData = useTokenData(address)

  const { data: tokenBalance, refetch: refreshTokenBalance } = useQuerySmart<{ balance: string }, string>({
    address,
    queryMsg: {
      balance: {
        address: accountData?.bech32Address,
      },
    },
  })

  const { data: tokenPrice, refetch: refreshTokenPrice } = useQuerySmart<TokenPrice, string>({
    address,
    queryMsg: {
      curve_info: {},
    },
  })

  const [activeTab, setActiveTab] = useState<TabType>(TabType.BUY)
  const [amount, setAmount] = useState("")
  const [voteData, setVoteData] = useState<VoteData>({ likes: 0, dislikes: 0 })

  useEffect(() => {
    const storedVotes = localStorage.getItem(`votes_${address}`)
    if (storedVotes) {
      setVoteData(JSON.parse(storedVotes))
    } else {
      const randomVotes = {
        likes: Math.floor(Math.random() * 201), // 0-200
        dislikes: Math.floor(Math.random() * 21), // 0-20
      }
      setVoteData(randomVotes)
      localStorage.setItem(`votes_${address}`, JSON.stringify(randomVotes))
    }
  }, [address])

  const handleVote = (type: 'likes' | 'dislikes') => {
    const newVoteData = {
      ...voteData,
      [type]: voteData[type] + 1
    }
    setVoteData(newVoteData)
    localStorage.setItem(`votes_${address}`, JSON.stringify(newVoteData))
  }

  const bbnBalance = balances?.find(item => item.denom === "ubbn")?.amount

  const voteList = [
    {
      num: voteData.likes,
      icon: (
        <div 
          className="cursor-pointer transition-transform hover:scale-110 active:scale-95"
          onClick={() => handleVote('likes')}
        >
          <LikeIcon />
        </div>
      ),
    },
    {
      num: voteData.dislikes,
      icon: (
        <div 
          className="cursor-pointer transition-transform hover:scale-110 active:scale-95"
          onClick={() => handleVote('dislikes')}
        >
          <DislikeIcon />
        </div>
      ),
    },
  ]

  const isBuy = activeTab === TabType.BUY

  const setMax = () => {
    if (isBuy) {
      setAmount(formatUnits(bbnBalance, 6))
    } else {
      setAmount(formatUnits(tokenBalance?.balance, 6))
    }
  }

  const handleBuy = () => {
    if (!bbnBalance || bbnBalance === "0") {
      toast.error("You have no BBN balance")
      return
    }
    const amountNum = parseUnits(amount, 6)
    if (Number(amountNum) > Number(bbnBalance)) {
      toast.error("You have no enough BBN balance")
      return
    }
    const id = toast.loading("Transaction in progress")
    executeContract(
      {
        signingClient: signingClient!,
        msg: { buy: {} },
        funds: [{ denom: "ubbn", amount: amountNum }],
      },
      {
        onError: err => {
          toast.dismiss(id)
          console.error("Buy transaction failed", err)
        },
        onSuccess: () => {
          refreshTokenBalance()
          refreshTokenPrice()
          toast.update(id, {
            closeButton: true,
            render: "Buy transaction successful",
            type: "success",
            isLoading: false,
          })
        },
      },
    )
  }

  const handleSell = () => {
    if (tokenBalance?.balance === "0") {
      toast.error("You have no this token balance")
      return
    }
    const amountNum = parseUnits(amount, 6)
    if (Number(amountNum) > Number(tokenBalance?.balance)) {
      toast.error("You have no enough token balance")
      return
    }
    const id = toast.loading("Transaction in progress")
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
          toast.dismiss(id)
          console.error("Sell token failed", err)
        },
        onSuccess: () => {
          refreshTokenBalance()
          refreshTokenPrice()
          toast.update(id, {
            closeButton: true,
            render: "Sell token successful",
            type: "success",
            isLoading: false,
          })
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
    <div className="flex h-screen flex-col bg-[url('/src/pages/Detail/assets/bg.svg')] bg-cover bg-bottom">
      <div className="flex w-full flex-1 items-center justify-center">
        <div className="relative flex h-3/4 w-3/4 rounded-[24px] border-4 border-solid border-black bg-white">
          <LeftTopIcon className="absolute -left-[130px] -top-[130px]" />
          <div className="flex flex-1 flex-col justify-center border-r border-solid border-black p-[40px]">
            {tokenData?.image && (
              <img className="w-full" src={tokenData?.image} alt="icon" />
            )}
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
                  Created by{" "}
                  <span className="underline">
                    {getEllipsisAddress(tokenData?.creator)}
                  </span>
                </div>
                <div>
                  {formatDate(tokenData?.createAt)}&nbsp;|&nbsp;
                  {formatTime(tokenData?.createAt)}
                </div>
              </div>
              <div className="mt-2 text-[18px] leading-[140%] text-[#D90368]">
                Market cap{" "}
                <span className="font-semibold">
                  {formatUnits(tokenPrice?.supply, 6)}
                </span>
              </div>
              <h2 className="mt-[40px] text-[36px] font-[900] uppercase leading-[100%]">
                {`${tokenData?.displayName} (ticker: ${tokenData?.ticker})`}
              </h2>
              <p className="mt-2 text-[16px] leading-[140%] text-black opacity-70">
                {tokenData?.description}
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
                className={`mt-6 flex cursor-pointer items-center justify-center rounded-[13px] border-[3px] border-solid border-black bg-[#FFCA05] px-[24px] py-[16px] text-[32px] font-[900] uppercase 
                  transition-all hover:scale-[1.02] hover:shadow-[0px_6px_6px_0px_rgba(0,0,0,0.25)] 
                  active:scale-[0.98] active:shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]`}
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
