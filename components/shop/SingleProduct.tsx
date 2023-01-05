import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { ScrollView } from 'react-native'
import styled from 'styled-components/native'
import { useCartContext } from '../../context/cart'
import { Products } from '../../data/Products'
import { Fonts } from '../../styles/Fonts'
import StyledButton from '../../styles/StyledButton'
import Header from '../home/Header'
import Options from './Options'
import ProductImages from './ProductImages'
import ProductPrice from './ProductPrice'




export default function SingleProduct({ navigation }: { navigation?: any }) {

    const route: any = useRoute()
    const id = route.params.id
    const ProductData = Products.filter((item) => item.id === id)
    const { addToCart } = useCartContext()

    const [selectedSize, setSelectedSize] = React.useState('')
    const [itemPrice, setitemPrice] = React.useState('')
    const buttonDisabled = selectedSize ? false : true


    return (
        <>
            <Header />
            <ScrollView>
                <Wrapper>

                    {ProductData.map((item, index) => (

                        <ProductWrapper key={index}>
                            <Heading>{item.title}</Heading>
                            {selectedSize ? <ProductPrice itemPrice={itemPrice} setitemPrice={setitemPrice} size={selectedSize} price={item.price} /> : <Price>{'$' + item.price.price_range}</Price>}

                            <Description>{item.description}</Description>
                            <Disclaimer>{item.disclaimer}</Disclaimer>
                            <Options selectedSize={selectedSize} setSelectedSize={setSelectedSize} available_sizes={item.available_sizes} />

                            <StyledButton buttonTitle='Add to cart' onPress={() => addToCart({
                                id: item.id,
                                title: item.title,
                                price: itemPrice,
                                description: item.description,
                                category: item.category,
                                images: item.images,
                                rating: {
                                    rate: item.rating.rate,
                                    count: item.rating.count
                                },
                                size: selectedSize,
                                qty: 1
                            })} disabled={buttonDisabled} />

                            <ProductImages key={item.id} images={item.images} />
                        </ProductWrapper>

                    ))}

                </Wrapper>
            </ScrollView>
        </>
    )
}

const Wrapper = styled.View`
display: flex;
justify-content: center;
align-content: center;
align-items: center;
padding: 16px;  
`
const Heading = styled.Text`
    font-size: 32px;
    font-family: ${Fonts.bold};
    margin-bottom: 16px;
    text-align: start;
    align-self: flex-start;
`
const Description = styled.Text`
    font-size: 18px;
    font-family: ${Fonts.medium};
`
const Price = styled.Text`
     font-size: 18px;
    font-family: ${Fonts.bold};
    margin-bottom: 16px;
    text-align: start;
    align-self: flex-start;
`
const Disclaimer = styled.Text`
    font-size: 18px;
    font-family: ${Fonts.medium};
    color: red;
    margin-top: 16px;
    align-self: flex-start;
    margin-bottom: 16px;
`
const ProductWrapper = styled.View`
    display: flex;
justify-content: center;
align-content: center;
align-items: center;
`




