import React from 'react'
import styled from 'styled-components/native'
import { Image, ImageBackground } from 'react-native'
import StyledButton from '../../styles/StyledButton'
import { useNavigation } from '@react-navigation/native'
import { Fonts } from '../../styles/Fonts'


type Props = {
    id?: number
    title: string
    price: any
    category?: string
    images: any
    qty?: number
    isAvailable: boolean
    size?: string
}
export default function ProductThumbnail({ id, title, price, category, images, qty, isAvailable, size }: Props) {

    const navigation: any = useNavigation()

    const handlePress = () => {
        navigation.navigate('SingleProduct', {
            id: id
        })
    }

    return (
        <>
            <CardWrapper>
                <ImgContainer>
                    <ImageBackground source={images[0]} style={{ flex: 1 }} imageStyle={{ borderRadius: 8 }} />
                </ImgContainer>
                <Row>


                    <TitlePrice>
                        <Title>{title}</Title>
                        <Price>{'$' + price.price_range}</Price>

                        <StyledButton disabled={false} buttonTitle='View' onPress={handlePress} />

                        {isAvailable ? null : <Icon>
                            <Price>Out of stock</Price>
                        </Icon>}


                    </TitlePrice>



                </Row>

            </CardWrapper>
        </>
    )
}







const CardWrapper = styled.View`
width: 100%;
display: flex;
align-items: center;
margin: 16px 0;
`

const Row = styled.View`
width: 100%;

`

const TitlePrice = styled.View`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;  
`

const Col = styled.View`
    width: 100%; 
`

const QtyBox = styled.View`
    text-align: end;
    justify-content: space-between;
    align-items: end;
`

const ImgContainer = styled.View`
    width: 300px;
    height: 300px;
    border-radius: 48px;
    box-shadow: 2px 2px 2px lightgrey;
`

const Icon = styled.View`
    
`
const Price = styled.Text`
    font-size: 18px;
    font-family: ${Fonts.medium};
`
const Title = styled.Text`
    font-family: ${Fonts.bold};
    font-size: 24px;
    margin: 16px 0;
`


