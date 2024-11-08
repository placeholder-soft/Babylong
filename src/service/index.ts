import { env } from "../env"

export type TokenData = {
    name: string
    displayName: string
    ticker: string
    description: string
    image: string
    create_at: number
}


export type Contract = {
    address: string;
    codeId: number;
    creator: string;
    admin: string | undefined;
    label: string;
    ibcPortId: string | undefined;
}

export type CombineTokenData = TokenData & Contract



export const getToken = async (name: string): Promise<TokenData> => {
    return await fetch(`${env.VITE_API_URL}/tokens/${name}`).then(res => res.json())
}

export const createToken = async (data: TokenData) => {
    return fetch(`${env.VITE_API_URL}/tokens/${data.name}`, {
        method: "POST",
        body: JSON.stringify(data),
    })
}

export const getTokenList = async (): Promise<TokenData[]> => {
    return (await fetch(`${env.VITE_API_URL}/token-list`)).json()
}
