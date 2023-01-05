export type UserInfo = {
    id: string
    username: string
    phone: string
    address: string
    customer_id: string
    role: string

}
export type UserInfoProps = {
    id: string
    username: string
    hash: string
    phone: string
    address: string
    customer_id: string
    role: string
    _created: string
    salt: string
}


export type UserProps = {
    user: UserInfo,
}

export type FeaturedProduct = {
    title: string
    price: {
        price_range: string
    },
    isAvailable: boolean,
    id: number,
    images: any
}

export type CartItem = {
    id: number
    title: string
    price: number
    description: string
    category: string
    images: string[]
    rating: {
        rate: number,
        count: number
    }
    size: string
    qty: number
}

