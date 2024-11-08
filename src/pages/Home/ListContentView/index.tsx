import React from "react"
import { mockNFTData } from "./test"
import tokens from "./_/tokens.png"
import coin from "./_/coin.png"

interface ListItemProps {
    name: string
    image: string
    description: string
}

interface ListContentProps {
    items: ListItemProps[]
}

const ListItem: React.FC<ListItemProps> = ({ name, image, description }) => {
    return (
        <div className="flex rounded-lg bg-white p-4 shadow-md transition-shadow duration-300 hover:shadow-lg h-fit">
            <div className="flex-shrink-0">
                <img
                    src={image}
                    alt={name}
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
                    <p>Comments: 59</p>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-gray-600"> <span className="font-semibold">{name}</span> {description}</p>
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
                {items.map((item, index) => (
                    <ListItem
                        key={index}
                        name={item.name}
                        image={item.image}
                        description={item.description}
                    />
                ))}
            </div>
        </div>
    )
}

export const WireListContent = () => {
    return <ListContent items={mockNFTData} />
}
