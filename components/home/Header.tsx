import React from 'react'
import { Image, SafeAreaView } from 'react-native'
import styled from 'styled-components/native'
import { Colors } from '../../styles/Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { useCartContext } from '../../context/cart';
import { Fonts } from '../../styles/Fonts';


type Props = {
    logoUrl?: string,
}
export default function Header({ logoUrl }: Props) {

    const navigation: any = useNavigation();
    const myhistory: any = useNavigationState(history => history)
    const [histomer, setHistomer] = React.useState(myhistory)


    const { cart } = useCartContext()
    const [cartTotal, setcartTotal] = React.useState(0)

    const openCartPage = () => {
        navigation.navigate('Cart', {})
    }
    const getTotal = () => {
        let total = cart?.reduce((total: number, item: any) => total + item.qty, 0)


        setcartTotal(total)

    }
    React.useEffect(() => {
        if (cart) {

            getTotal()
        }

    }, [cart, myhistory])

    const HeaderLogo = myhistory?.history[1]?.key.includes('SingleProduct') ?
        <LockWrapper>
            <BackButton onPress={() => {
                if (myhistory?.history[1]?.key.includes('SingleProduct')) {
                    navigation.navigate('Shop')
                } else {
                    navigation.goBack()
                }
            }}>
                <MaterialCommunityIcons name="backburger" size={42} color="white" />
            </BackButton>

        </LockWrapper>

        : <Logo source={require('../../assets/logo.png')} />

    return (
        <Content>

            <SafeAreaView>
                <Wrapper>
                    {HeaderLogo}
                    <LockWrapper>
                        <Button onPress={openCartPage}>
                            <MaterialCommunityIcons name="cart-outline" size={38} color="white" />
                            {cartTotal >= 1 && (
                                <CountWrapper>
                                    <Count>{cartTotal}</Count>
                                </CountWrapper>
                            )}
                        </Button>
                    </LockWrapper>
                </Wrapper>
            </SafeAreaView>
        </Content>
    )
}

const Wrapper = styled.View`
    width: 100%;
    min-height: 50px;
    background-color: ${Colors.blueGreen};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
const Content = styled.View`
    width: 100%;
    background-color: ${Colors.blueGreen};

`
const Logo = styled(Image)`
   height: 100px;
   width: 100px;
`
const LockWrapper = styled.View`
    padding: 28px 25px 16px 0;
`
const Button = styled.Pressable`
    position: relative;
`
const BackButton = styled.Pressable`
    padding-left: 16px;
    padding-bottom: 16px;
`
const Count = styled.Text`
    font-family: ${Fonts.medium};
    color: white;
    font-size: 16px;
    `
const CountWrapper = styled.View`
position: absolute;
display: flex;
justify-content: center;
align-items: center;
padding: 4px;
top: -18px;
left: 16px;

border-radius: 50%;
background-color: black;
min-width: 30px;
min-height: 30px;
    
`
