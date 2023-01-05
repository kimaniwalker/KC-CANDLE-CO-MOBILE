import React from 'react'
import { ActivityIndicator } from 'react-native'
import BillingPortal from '../components/profile/BillingPortal'
import { useUserContext } from '../context/user'


export default function BillingScreen() {

    const { user } = useUserContext()

    if (!user.customer_id) return <ActivityIndicator size="large" />
    return (
        <>
            <BillingPortal customer_id={user.customer_id} />
        </>
    )
}
