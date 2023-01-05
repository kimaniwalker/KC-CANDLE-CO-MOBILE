import React from 'react'
import SubscriptionSignup from '../components/profile/SubscriptionSignup'
import Calendar from '../components/calendar'
import Header from '../components/home/Header'
import CandlePicker from '../components/profile/CandlePicker'
import { useUserContext } from '../context/user'

export default function CalendarScreen() {

    const { user } = useUserContext()



    if (!user.id) return <SubscriptionSignup />
    return (
        <>
            {/* <Calendar /> */}
            <Header />
            <CandlePicker id={user.id} />
        </>
    )
}
