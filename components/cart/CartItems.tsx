import React from 'react'
import { ImageBackground } from 'react-native'
import styled from 'styled-components/native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useCartContext } from '../../context/cart';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../../styles/Colors';
import { Fonts } from '../../styles/Fonts';

type Props = {
    title: string
    price: number
    qty: number
    images: any
    id: number
    size: string
}

export default function CartItems({ id, title, price, qty, images, size }: Props) {

    const { changeQty, removeCartItem } = useCartContext()


    return (
        <>
            <Wrapper>

                <ImageWrapper>
                    <ImageBackground source={images[0]} style={{ flex: 1 }} imageStyle={{ borderRadius: 8 }} />
                    <IconWrapper>
                        <Button onPress={() => removeCartItem(id, size)}>
                            <CloseIcon name="clear" size={32} color="white" />
                        </Button>
                    </IconWrapper>
                </ImageWrapper>
                <Title>{title}</Title>

                <Row>
                    <Item>
                        <Price>${price}</Price>
                    </Item>
                    <Item>
                        <Size>{size}</Size>
                    </Item>
                    <Item>
                        <Qty>qty: {qty}</Qty>
                    </Item>


                    <MinusButton onPress={() => changeQty(id, qty - 1, size)}>
                        <MaterialCommunityIcons name="cart-minus" size={32} color="white" />
                    </MinusButton>


                    <PlusButton onPress={() => changeQty(id, qty + 1, size)}>
                        <MaterialCommunityIcons name="cart-plus" size={32} color="white" />
                    </PlusButton>




                </Row>
            </Wrapper>
        </>
    )
}

const Wrapper = styled.View`
    margin: 16px 0 ;
    padding: 24px;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    border-radius: 8px;
    box-shadow: 7px 5px 5px lightgrey;
    background-color: whitesmoke;
`


const Title = styled.Text`
    font-size: 24px;
    font-family: ${Fonts.bold};
`
const Price = styled.Text`
    font-size: 24px;
    font-family: ${Fonts.medium};
`
const Qty = styled.Text`
    font-size: 16px;
    font-family: ${Fonts.medium};
    padding: 8px 8px;
    text-transform: uppercase;
`
const ImageWrapper = styled.View`
    height: 300px;
    width: 300px;
    background-color: red;
    margin-bottom: 16px;
    position: relative;

`
const Row = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: space-between;
    width: 65%;
    margin-top: 16px;
`
const IconRow = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: space-between;
    position: absolute;
    top: -90px;
    right: -55px;
    width: 150%;
`

const Item = styled.View`
    
`
const Button = styled.Pressable`
    border-radius: 50%;
    background-color: ${Colors.dark};
    padding: 8px;
`
const Size = styled.Text`
    font-size: 16px;
    font-family: ${Fonts.medium};
    text-transform: uppercase;
    margin-top: 8px;
`
const CloseIcon = styled(MaterialIcons)`
    
`
const IconWrapper = styled.View` 
    position: absolute;
    top: -15px;
    right: -10px;
    border-radius: 50%;
`
const MinusButton = styled.Pressable`
    border-radius: 50%;
    background-color: ${Colors.dark};
    padding: 8px;
    position: absolute;
    bottom: 90px;
    right: 240px;
    
`
const PlusButton = styled.Pressable`
    border-radius: 50%;
    background-color: ${Colors.dark};
    padding: 8px;
    position: absolute;
    bottom: 90px;
    left: 240px;
    
`


