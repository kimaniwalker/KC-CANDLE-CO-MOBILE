import React from 'react'
import { useUserContext } from '../context/user'
import SubscriptionSignup from '../components/profile/SubscriptionSignup'
import OptionCard from '../components/profile/OptionCard'
import styled from 'styled-components/native'
import { ScrollView, Text, View } from 'react-native'
import Header from '../components/home/Header'
import { Colors } from '../styles/Colors'
import { removeItem } from '../lib/useAuthHooks'
import { Fonts } from '../styles/Fonts'
import AccountDeletion from '../components/profile/AccountDeletion'

export default function ProfileScreen({ navigation }: any) {
    const { user, setUser, setLoggedIn } = useUserContext()
    const [showModal, setShowModal] = React.useState(false)

    React.useEffect(() => {

    }, [])
    const vipContent = (
        <>
            <Header />
            <ScrollView>
                <Wrapper>
                    <OptionCard image={require('../assets/profile/calendar.png')} handlePress={() => navigation.navigate('Calendar')} title='My Calendar' description='Make changes to your schedule as you see fit.' />
                    <OptionCard image={require('../assets/profile/account.png')} handlePress={() => navigation.navigate('Billing')} title='My Account' description='Manage your account details. Make changes to your subscription.' />
                    <OptionCard image={require('../assets/profile/shop.png')} handlePress={() => navigation.navigate('Shop')} title='Shop Now' description='Shop now and receive exlcusive deals and discounts.' />
                    <OptionCard image={require('../assets/profile/terms.png')} handlePress={() => navigation.navigate('Terms')} title='Terms & Conditions' description='See the terms and conditions for your membership.' />
                    <OptionCard image={require('../assets/profile/terms.png')} handlePress={() => navigation.navigate('CollectShippingInfo')} title='Update Shipping Information' description='Verify your shipping address is up to date'
                        children={<>
                            <View style={{ marginTop: 8, padding: 4, borderRadius: 8, backgroundColor: Colors.blueGreen, margin: 0, display: 'flex', justifyContent: 'center', alignContent: 'center', }}>
                                <Text style={{ fontSize: 16, color: Colors.white, fontFamily: Fonts.medium }}>{user?.address?.split("-").join(" ")}</Text>
                            </View>

                        </>} />
                    <OptionCard title='Delete your account' description='Need to delete your account ? We would hate to see you go.' handlePress={() => {
                        setShowModal(true)
                    }} />
                    <OptionCard title='Logout' description='Need to logout ? Press here.' handlePress={() => {
                        setUser({
                            id: "",
                            username: "",
                            phone: "",
                            address: "",
                            customer_id: "",
                            role: "",
                            push_token: ""
                        })
                        setLoggedIn(false)
                        removeItem('user')
                        removeItem('authToken')
                        navigation.navigate('Home')
                    }} />
                </Wrapper>
            </ScrollView>
        </>
    )

    /* const content = !user.address ? <CollectShippingInfo /> : vipContent */
    if (!user.customer_id) return <SubscriptionSignup />
    if (showModal) return <AccountDeletion showModal={showModal} setShowModal={setShowModal} />
    return vipContent
}

const Wrapper = styled.View`
    padding: 24px 24px;
`
