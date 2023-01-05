import React from 'react'
import { ImageBackground, ScrollView } from 'react-native'
import styled from 'styled-components/native'
import { Fonts } from '../../styles/Fonts'
import StyledButton from '../../styles/StyledButton'

type Props = {
    heading: string,
    subheading?: string,
    description: string
    buttonTitle: string
    handlePress: () => void
}
export default function Featured({ heading, subheading, buttonTitle, handlePress, description }: Props) {

    return (
        <>


            <Wrapper>
                <Col>
                    <Heading>{heading}</Heading>
                    {subheading && (<SubHeading>{subheading}</SubHeading>)}
                    <Description>{description}</Description>

                    <CTA>
                        <StyledButton buttonTitle={buttonTitle} onPress={handlePress} disabled={false} />
                    </CTA>



                </Col>
                <Col>
                    <Container>
                        <ImageBackground imageStyle={{ borderRadius: 8 }} style={{ flex: 1 }} source={require('../../assets/18-IMG_7050.jpg')} />
                    </Container>
                </Col>
            </Wrapper>



        </>
    )
}

const Heading = styled.Text`
    font-size: 42px;
    text-align: start;
    font-family: ${Fonts.bold};
    margin-top: 0;
    margin-bottom: 16px;

`

const SubHeading = styled.Text`
    font-size: 24px;
    text-align: start;
    color: black;
`

const Description = styled.Text`
    text-align: start;
    font-size: 18px;
    max-width: 641px;
    font-family: ${Fonts.medium};

`

const Wrapper = styled.View`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 50px;
    flex-wrap: wrap;
    align-items: center;  
    align-content: center;
    padding: 0 16px;
`

const Container = styled.View`
height: 225px;
width: 100%;
background-color: white;
position: relative;
border-radius: 8px;

`

const Col = styled.View`
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: start;
    justify-content: center;
    align-items: center;
`



const CTA = styled.View`
    display: flex;
    justify-content: start;
    margin-bottom: 16px; 
`




