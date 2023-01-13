import React from 'react'
import { Image, SafeAreaView } from 'react-native'
import styled from 'styled-components/native'
import { Fonts } from '../../styles/Fonts'
import StyledButton from '../../styles/StyledButton'
import CollectShippingInfo from '../profile/CollectShippingInfo'

type Props = {
    checkout: () => void,
    address?: string
    visible: boolean
    setVisible: (isVible: boolean) => void
}

export default function VerifyDetails({ visible, setVisible, checkout, address }: Props) {

    const [showCollectInfo, setShowCollectInfo] = React.useState(false)
    const handleCheckout = () => {
        setVisible(false)
        checkout()
    }



    if (showCollectInfo) return <SafeAreaView><CollectShippingInfo isVerification={true} dismissModal={() => setShowCollectInfo(false)} /></SafeAreaView>
    return (
        <>

            <Wrapper>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={visible}
                >
                    <Wrapper>
                        <Image style={{ width: 140, height: 70, marginBottom: 30 }} source={require('../../assets/logo.png')} />


                        <Title>Verify Your Address</Title>
                        <Heading>Is this the correct address for your order ?</Heading>
                        <SubHeading>{address?.replaceAll("-", " ")}</SubHeading>
                        <StyledButton buttonTitle='Update' disabled={false} onPress={() => setShowCollectInfo(true)} />
                        <StyledButton buttonTitle='Confirm' disabled={false} onPress={checkout} />
                    </Wrapper>
                </Modal>
            </Wrapper>

        </>
    )
}

const Wrapper = styled.View`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 22px;
    padding: 0 16px;
`
const Modal = styled.Modal`
    margin: 20px;
    border-radius: 20px;
    padding: 35px;
    align-items: center;
    box-shadow: 7px 5px 5px #000;  
`
const Heading = styled.Text`
    font-size: 24px;
    font-family: ${Fonts.medium};
    text-align: center;
    margin-bottom: 20px;
    max-width: 300px;
`
const SubHeading = styled.Text`
    font-size: 18px;
    font-family: ${Fonts.bold};
    text-align: center;
`
const Title = styled.Text`
    font-size: 32px;
    font-family: ${Fonts.bold};
    text-align: center;
    margin-bottom: 30px;
`
