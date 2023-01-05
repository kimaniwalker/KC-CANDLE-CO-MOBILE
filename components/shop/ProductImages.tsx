import React from 'react'
import { ImageBackground, ScrollView } from 'react-native'
import styled from 'styled-components/native'

type Props = {
    images: any
}
export default function ProductImages({ images }: Props) {

    const [main, setMain] = React.useState(images[0])

    const handlePress = (key: any) => {
        setMain(images[key])
    }

    return (
        <>
            <Wrapper>
                <Featured>
                    <ImageBackground source={main} style={{ flex: 1 }} imageStyle={{ borderRadius: 8 }} />
                </Featured>

                <Row>
                    <ScrollView horizontal>

                        {images.map((image: any, index: KeyType) => (

                            <Thumbnails key={index}>
                                <Button onPress={() => handlePress(index)}>

                                    <ImageBackground source={image} style={{ flex: 1 }} imageStyle={{ borderRadius: 8 }} />
                                </Button>
                            </Thumbnails>
                        ))}


                    </ScrollView>
                </Row>
            </Wrapper>
        </>
    )
}

const Wrapper = styled.View`
    margin: 16px auto;
    display: flex;
    justify-content: center;
    align-items: center;

`
const Featured = styled.View`
    width: 350px;
    height: 300px;
    margin-bottom: 24px;
    border-radius: 8px;
    box-shadow: 2px 2px 2px lightgrey;
`
const Thumbnails = styled.View`
    width: 100px;
    height: 100px;
    margin: 8px;
`
const Button = styled.Pressable`
    width: 100%;
    height: 100%;
`
const Row = styled.View`
    display: flex;
    flex-direction: row;   
`