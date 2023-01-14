
import { SafeAreaView, StatusBar } from 'react-native'
import styled from 'styled-components/native'
import { Colors } from '../../styles/Colors'
import { Fonts } from '../../styles/Fonts'

type Props = {
    message: string
    handlePress?: () => void
    messagecolor: string
}

const PromoBanner = ({ message, handlePress, messagecolor }: Props) => {

    return (
        <>
            <Content>
                <SafeAreaView>
                    <Wrapper>
                        <Button onPress={handlePress}>
                            <PromoMessage messagecolor={messagecolor}>{message}</PromoMessage>
                        </Button>
                    </Wrapper>
                </SafeAreaView>
            </Content>
        </>

    )
}

const Wrapper = styled.View`
width: 100%;
min-height: 18px;
background-color: #161c2d;
display: flex;
flex-direction: row;
justify-content: center;
flex-wrap: wrap;
text-align: center;
padding: 16px 24px;
`
const Button = styled.Pressable`
    width: 100%;
`
const Content = styled.View`
    width: 100%;
    background-color: #161c2d;
`

const PromoMessage = styled.Text<{ messagecolor: string }>`
text-align: center;
font-family: ${Fonts.medium};
font-size: 18px;
font-weight: 500;
color: ${props => props.messagecolor};
`

export default PromoBanner
