import React from 'react'
import { ScrollView } from 'react-native'
import styled from 'styled-components/native'
import { Fonts } from '../../styles/Fonts'
import StyledButton from '../../styles/StyledButton'
import Header from '../home/Header'
import AppleAuth from './AppleAuth'
import Form from './Form'
import Otp from './Otp'

export default function AuthSelection({ }) {

    const [emailLogin, setEmailLogin] = React.useState(false)
    const [phoneLogin, setPhoneLogin] = React.useState(false)
    const [showSignUp, setShowSignUp] = React.useState(false)


    if (emailLogin) return <Form isSignup={false} setShowSignUp={setShowSignUp} showSignUp={showSignUp} />

    return (
        <>
            <Header />
            <Wrapper>
                <Content>

                    <Title>Choose a login method to get started</Title>
                    <Subheading>Get exclusive deals and discounts by becoming a VIP member.</Subheading>
                </Content>
                <StyledButton buttonTitle='Email & Password' disabled={false} onPress={() => setEmailLogin(true)} />
                {/* <Otp /> */}
                <AppleAuth />

            </Wrapper>
        </>
    )
}

const Wrapper = styled.View`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    padding: 16px;
`
const Title = styled.Text`
    font-family: ${Fonts.bold};
    font-size: 40px;
    text-align: start;
    margin-bottom: 24px;
`
const Subheading = styled.Text`
    font-family: ${Fonts.medium};
    font-size: 24px;
    text-align: start;
`
const Content = styled.View`
    width: 327px;
`