import React, { useEffect, useMemo, useState } from "react"
import tokens from "./_/tokens.png"
import coin from "./_/coin.png"
import page from "./_/page.png"


import LeftArrow from "./_/chevrons-left.svg?react"
import RightArrow from "./_/chevrons-right.svg?react"

import { CombineTokenData, getTokenList, TokenData } from "../../../service"
import { useCosmWasmSigningClient, useQuerySmart } from "graz"
import { signingOpts } from "../../../constant"
import { useNavigate } from "react-router"
import { formatDate, formatTime } from "../../../utils/date"
import { getEllipsisAddress } from "../../../utils/formatAddress"
import { formatUnits } from "../../../utils/number"
import { TokenPrice } from "../../Detail"
import { useSearch } from '../../../context/SearchContext';
import { KingHillView } from "./KingHillView"


interface ListContentProps {
    items: CombineTokenData[]
}

const ListItem: React.FC<{ item: CombineTokenData }> = ({ item }) => {
    const navigate = useNavigate()
    const { data: tokenPrice } = useQuerySmart<TokenPrice, string>({
        address: item.address,
        queryMsg: {
            curve_info: {},
        },
    });

    return (
        <div 
            className="flex rounded-lg bg-white gap-6 p-4 shadow-md max-w-[533px] 
            transition-all duration-300 
            hover:shadow-xl hover:scale-[1.02] 
            active:scale-[0.98] active:shadow-md 
            cursor-pointer border-[2px] border-black 
            h-fit" 
            onClick={() => navigate(`/detail/${item.address}`)}
        >
            <div className="flex-shrink-0">
                <img
                    src={item.image}
                    alt={item.name}
                    className="h-40 w-40 rounded-lg object-cover"
                />
            </div>
            <div className="flex-grow flex flex-col gap-4 mt-4">
                <div className="flex items-center justify-between">
                    <p>Created by <span className="underline">{getEllipsisAddress(item?.creator)}</span></p>
                    <p>  {formatDate(item?.createAt)}
                    </p>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-[#D90368]">Market cap <span className="font-medium">  {formatUnits(tokenPrice?.supply, 6)}</span></p>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-gray-600 text-wrap break-all"> <span className="font-semibold text-black text-lg">{item.ticker}</span> {item.description}</p>
                </div>
            </div>
        </div>
    )
}

const ListContent: React.FC<ListContentProps> = ({ items }) => {
    const { searchValue } = useSearch();

    const filteredItems = items.filter(item =>
        item.address.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <div className="mx-auto bg-[#FFCA05] px-4 py-8 pt-[124px] relative">
            <div className="flex items-center justify-center gap-4 relative mb-[84px]">
                <img className="h-[108px]" src={tokens} alt="tokens" />
                <img className="w-[125px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" src={coin} alt="coin" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1680px] mx-auto">
                {filteredItems.map((item, idx) => (
                    <ListItem
                        key={idx}
                        item={item}
                    />
                ))}

            </div>
            {filteredItems.length === 0 && <p className="text-gray-600 my-24 text-center text-2xl">No tokens found</p>}
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
    const [tokenList, setTokenList] = useState<CombineTokenData[]>([])

    const lastItem = useMemo(() => tokenList[tokenList.length - 1], [tokenList])

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
        if (!signingClient) return
        Promise.all([getTokenList(), getContractTokens()]).then(([tokenList, contractInfos]) => {
            const result = tokenList.map(token => {
                const contractInfo = contractInfos.find(info => info?.label.includes(token.name))
                return {
                    ...token,
                    ...contractInfo
                } as CombineTokenData
            })
            setTokenList(result.reverse())
        })
    }, [signingClient])


    return <>
        <ListContent items={tokenList} />
        {lastItem && <KingHillView item={lastItem} />}
    </>
}
