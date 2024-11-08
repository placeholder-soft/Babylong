import React, { useEffect, useState } from "react"
import tokens from "./_/tokens.png"
import coin from "./_/coin.png"
import page from "./_/page.png"


import LeftArrow from "./_/chevrons-left.svg?react"
import RightArrow from "./_/chevrons-right.svg?react"

import { getTokenList, TokenData } from "../../../service"
import { useCosmWasmSigningClient, useQuerySmart } from "graz"
import { signingOpts } from "../../../constant"
import { useNavigate } from "react-router"


type ListItemProps = TokenData & {
    address: string
}
interface ListContentProps {
    items: ListItemProps[]
}

const ListItem: React.FC<{item: ListItemProps}> = ({ item }) => {
    const navigate = useNavigate()
    const { data: tokenPrice } = useQuerySmart({
        address: item.address,
        queryMsg: {
          curve_info: {},
        },
      });

    return (
        <div className="flex rounded-lg bg-white p-4 shadow-md transition-shadow duration-300 hover:shadow-lg h-fit cursor-pointer" onClick={() => navigate(`/detail/${item.address}`)}>
            <div className="flex-shrink-0">
                <img
                    src={item.image}
                    alt={item.name}
                    className="h-40 w-full rounded-lg object-cover"
                />
            </div>
            <div className="flex-grow mt-4">
                <div className="flex items-center justify-between">
                    <p>Created by <span className="underline">2B5XZX</span></p>
                    <p>4h ago</p>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-[#D90368]">Market cap <span className="font-medium">47.50K</span></p>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-gray-600"> <span className="font-semibold">{item.name}</span> {item.description}</p>
                </div>
            </div>
        </div>
    )
}

const ListContent: React.FC<ListContentProps> = ({ items }) => {
    return (
        <div className="mx-auto bg-[#FFCA05] px-4 py-8 pt-[124px]">
            <div className="flex items-center justify-center gap-4 relative mb-[84px]">
                <img className="h-[108px]" src={tokens} alt="tokens" />
                <img className="w-[125px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" src={coin} alt="coin" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1680px] mx-auto">
                {items.map((item, idx) => (
                    <ListItem
                        key={idx}
                        item={item}
                    />
                ))}
            </div>
            <div className="flex items-center justify-center gap-4 h-[159px] mt-[120px]">
                <LeftArrow />
                <div className="flex items-center justify-center gap-4 relative">
                    <img src={page} alt="page" />
                    <p className="absolute text-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">01</p>
                </div>
                <RightArrow />
            </div>
        </div>
    )
}

export const WireListContent = () => {
    const [tokenList, setTokenList] = useState<ListItemProps[]>([])

    const { data: signingClient } = useCosmWasmSigningClient({
        opts: signingOpts,
    })

    const getContractTokens = async () => {
        const contracts = await signingClient?.getContracts(82) || []
        const contractInfos = await Promise.all(contracts.map(async (contract) => {
            return await signingClient?.getContract(contract)
        }))
        return contractInfos
    }

    useEffect(() => {
        Promise.all([getTokenList(), getContractTokens()]).then(([tokenList, contractInfos]) => {
            const result  = tokenList.map(token => {
                const contractInfo = contractInfos.find(info => info?.label.includes(token.name))
                return {
                    ...token,
                    ...contractInfo
                } as ListItemProps
            })
            setTokenList(result)
        })
    }, [signingClient])

   
    return <ListContent items={tokenList} />
}
