import { useState } from "react"
import { useParams } from "react-router"
import { Footer } from "../../components/footer"
import { useTokenInfo } from "../../hooks/useToken"
import ButtonIcon from "./assets/button-icon.svg?react"
import DislikeIcon from "./assets/dislike-icon.svg?react"
import LeftTopIcon from "./assets/left-top-icon.svg?react"
import LikeIcon from "./assets/like-icon.svg?react"
import { Tab, TabType } from "./assets/Tab"

export default function Detail() {
  const { address } = useParams()
  useTokenInfo(address)
  const [activeTab, setActiveTab] = useState<TabType>(TabType.BUY)
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
                <span className="cursor-pointer underline">Max</span>
              </div>
              <div className="flex items-center justify-between rounded-[9px] border-4 border-solid border-[#E6E6E6] px-[24px] py-[16px] text-[32px]">
                <input
                  type="number"
                  placeholder="0.0"
                  className="h-[45px] flex-1 font-bold outline-none placeholder:text-black"
                />
                <span className="ml-4 leading-[140%] text-black">BBN</span>
              </div>
              <div className="mt-6 flex cursor-pointer items-center justify-center rounded-[13px] border-[3px] border-solid border-black bg-[#FFCA05] px-[24px] py-[16px] text-[32px] font-[900] uppercase shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
                {activeTab === TabType.BUY ? "BUY" : "SELL"} Token
                <ButtonIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
