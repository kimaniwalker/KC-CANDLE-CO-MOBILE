import React from 'react'
import { ImageBackground } from 'react-native'
import styled from 'styled-components/native'

type Props = {
    handlePress?: () => void
}
export default function Hero({ handlePress }: Props) {



    return (
        <>
            <Wrapper>
                <Button onPress={handlePress}>
                    <ImageWrapper>
                        <ImageBackground imageStyle={{ borderRadius: 8, resizeMode: 'contain' }} style={{ height: '100%', width: '100%' }} source={require('../../assets/viphero.png')} />
                    </ImageWrapper>
                </Button>
            </Wrapper>
        </>
    )
}

const Wrapper = styled.View`
    width: 100%;
    min-height: 200px;
    padding: 16px;
`
const ImageWrapper = styled.View`
    width: 100%;
    height: 200px;
    border-radius: 8px;
`
const Button = styled.Pressable`
    
`
