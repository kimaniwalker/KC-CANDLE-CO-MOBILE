import React, { ReactNode } from 'react'
import { ImageBackground } from 'react-native'
import styled from 'styled-components/native'
import { Colors } from '../../styles/Colors'
import { Fonts } from '../../styles/Fonts'

type Props = {
    title: string
    description: string
    children?: ReactNode
    handlePress?: () => void
    image?: any
}
export default function OptionCard({ title, description, children, handlePress, image }: Props) {


    return (
        <>
            <Wrapper>
                <ImageBackground fadeDuration={3000} blurRadius={3} source={image} style={{ flex: 1 }}>

                    <Button onPress={handlePress}>
                        <Title>{title}</Title>
                        <Description>{description}</Description>
                        <Content>{children}</Content>
                    </Button>
                </ImageBackground>

            </Wrapper>
        </>
    )
}

const Wrapper = styled.View`
    width: 100%;
    min-height: 250px;
    border: solid black 2px;
    border-radius: 8px;
    margin: 16px auto;
    background-color: white;
    box-shadow: 10px 5px 5px ${Colors.dark};
`
const Title = styled.Text`
    font-size: 32px;
    font-family: ${Fonts.bold};
    margin-bottom: 8px;
    color: ${Colors.green500};
`
const Description = styled.Text`
    font-size: 18px;
    font-family: ${Fonts.medium};
`
const Content = styled.View`
    
`
const Button = styled.Pressable`
    flex: 1;
    padding: 16px;
`