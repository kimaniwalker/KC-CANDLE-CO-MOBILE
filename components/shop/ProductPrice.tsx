import React from 'react'
import { Text } from 'react-native'
import styled from 'styled-components/native'
import { Fonts } from '../../styles/Fonts'

type Props = {
    size: string
    price: any
    itemPrice: string
    setitemPrice: (price: any) => void
}
export default function ProductPrice({ size, price, setitemPrice, itemPrice }: Props) {



    const getprice = () => {
        if (size === '4oz') {
            setitemPrice(price.fouroz)
        } else if (size === '8oz') {
            setitemPrice(price.eightoz)
        } else if (size === '10oz') {
            setitemPrice(price.tenoz)
        } else if (size === '12oz') {
            setitemPrice(price.twelveoz)
        } else if (size === 'Wax Melts') {
            setitemPrice(price.Wax_Melts)
        } else if (size === 'Monthly') {
            setitemPrice(price.Monthly)
        }
        else if (size === 'Yearly') {
            setitemPrice(price.Yearly)
        }
    }

    React.useEffect(() => {
        getprice()
    }, [size])

    return (
        <>
            <Price>{'$' + itemPrice}</Price>
        </>
    )
}

const Price = styled.Text`
     font-size: 18px;
    font-family: ${Fonts.bold};
    margin-bottom: 16px;
    text-align: start;
    align-self: flex-start;
`
