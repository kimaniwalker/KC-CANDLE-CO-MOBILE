import React from 'react'
import { supabase } from '../../lib/supabase'
import { Alert } from 'react-native'
import StyledButton from '../../styles/StyledButton'

export default function Otp({ }) {

    const handlePress = async () => {
        let { error } = await supabase.auth.signInWithOtp({
            phone: '+13334445555',
        })
        if (error) Alert.alert(error.message)
    }

    return (
        <>
            <StyledButton onPress={handlePress} buttonTitle="Phone number" disabled={false} />
        </>
    )
}


