import React from 'react'
import { ActivityIndicator, SafeAreaView } from 'react-native'
import Header from '../components/home/Header'
import BillingPortal from '../components/profile/BillingPortal'
import { useUserContext } from '../context/user'


export default function BillingScreen() {

    const { user } = useUserContext()

    if (!user.customer_id) return <ActivityIndicator size="large" />
    return (
        <>
            <Header />
            <BillingPortal customer_id={user.customer_id} />

        </>
    )
}
