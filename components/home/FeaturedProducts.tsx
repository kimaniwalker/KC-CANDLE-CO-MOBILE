import React from 'react'
import styled from 'styled-components/native'
import { Colors } from '../../styles/Colors'
import { FeaturedData } from '../../data/FeaturedProducts'
import { Image, ScrollView } from 'react-native'
import { FeaturedProduct } from '../../lib/types'
import { useNavigation } from '@react-navigation/native'
import { Fonts } from '../../styles/Fonts'

type Props = {
    headingVisible: boolean
}
export default function FeaturedProducts({ headingVisible }: Props) {

    const naviation: any = useNavigation()
    const handlePress = (id: number) => {
        naviation.navigate('SingleProduct', {
            id: id
        })
    }

    return (
        <>
            <Wrapper>
                {headingVisible && (
                    <HeadingWrapper>
                        <Heading>Shop Our Luxery Desert Candles</Heading>
                    </HeadingWrapper>
                )}
                <Content>

                    <ScrollView horizontal>
                        {FeaturedData.map((item: FeaturedProduct) => (
                            <Item key={item.title}>
                                <Button onPress={() => handlePress(item.id)}>


                                    <Image style={{ height: 250, width: 250, borderRadius: 8 }} source={item.images} />
                                    <Title>
                                        {item.title}
                                    </Title>
                                    <Price>
                                        {item.price.price_range}
                                    </Price>

                                </Button>
                            </Item>
                        ))}
                    </ScrollView>
                </Content>
            </Wrapper>
        </>
    )
}

const Wrapper = styled.View`
    width: 100%;
    margin: 0 auto;
    padding: 24px;
`
const HeadingWrapper = styled.View`
    background-color: ${Colors.peach};
    margin: 16px auto;
    padding: 16px;
    width: 100%;
    border-radius: 8px;
`
const Heading = styled.Text`
    font-size: 32px;
    font-family: ${Fonts.medium};
    text-align: center;
    color: white;
`
const Content = styled.View`
    display: flex;
    flex-direction: row;
    margin: 16px 0;
`
const Item = styled.View`
    margin: 16px;
`
const Price = styled.Text`
    font-size: 18px;
    margin: 8px;
    font-family: ${Fonts.medium};
`
const Title = styled.Text`
    font-size: 24px;
    margin: 8px;
    font-family: ${Fonts.bold};
    max-width: 220px;
`
const Button = styled.Pressable`
    
`
