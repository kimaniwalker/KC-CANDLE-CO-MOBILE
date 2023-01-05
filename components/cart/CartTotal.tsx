import React from 'react'
import styled from 'styled-components/native'
import { useUserContext } from '../../context/user'
import { Colors } from '../../styles/Colors'
import { Fonts } from '../../styles/Fonts'
import StyledButton from '../../styles/StyledButton'

type Props = {
    total: number
    onCheckout: () => void
    disabled: boolean
}
export default function CartTotal({ total, onCheckout, disabled }: Props) {

    const { user } = useUserContext()

    const [shipping, setShipping] = React.useState(user.customer_id ? 0 : 8)

    const subtotal = total + shipping



    return (
        <Wrapper>
            <Total>Total: ${subtotal}</Total>
            <SubTotal>Cart: ${total}</SubTotal>
            <SubTotal>Shipping: ${shipping}</SubTotal>
            <StyledButton buttonTitle='Checkout' disabled={!disabled} onPress={onCheckout} />
        </Wrapper>
    )
}

const Wrapper = styled.View`
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    background-color: lightgray;
    padding: 32px 0;
    width: 100%;
    border-radius: 8px;
    border: 1px solid ${Colors.blueGreen};
     box-shadow: 7px 5px 5px lightgrey;
`
const Total = styled.Text`
     font-size: 48px;
    font-family: ${Fonts.bold};
    margin-bottom: 16px;
`
const SubTotal = styled.Text`
     font-size: 24px;
        font-family: ${Fonts.medium};
`
