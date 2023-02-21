import React from 'react'
import { Alert } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import { supabase } from '../../lib/supabase';
import { checkIfUserExist, createNewUser, getUser, storeUser } from '../../lib/useAuthHooks';
import { createNewCalendar } from '../../lib/useCalendarHooks';
import { useUserContext } from '../../context/user';

export default function AppleAuth() {

    const { setLoggedIn, setUser } = useUserContext()

    return (
        <AppleAuthentication.AppleAuthenticationButton
            buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
            buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
            cornerRadius={48}
            style={{
                width: 325, height: 50, shadowOffset: { width: 2, height: 2 },
                shadowRadius: 4,
                shadowOpacity: 1,
                elevation: 4,
                marginTop: 40
            }}
            onPress={async () => {
                try {
                    const credential = await AppleAuthentication.signInAsync({
                        requestedScopes: [
                            AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                            AppleAuthentication.AppleAuthenticationScope.EMAIL,
                        ],
                    });

                    // signed inq
                    if (credential.email) {

                        const { data, error } = await supabase.auth.signUp({
                            email: credential.email,
                            password: credential.user.slice(0, 9),
                        })

                        if (data.user) {
                            await createNewCalendar(data.user.id)
                            await createNewUser(data.user)

                            const user = await getUser(data.user.id)
                            if (user) {
                                setUser(user[0])
                                storeUser({ value: user[0], key: 'user' })
                            }
                            setLoggedIn(true)

                            if (error) throw error
                        }
                    } else {
                        let userExist = await checkIfUserExist('user')

                        let user = await getUser(userExist.id)
                        if (user) {
                            setUser(user[0])
                        }
                        setLoggedIn(true)

                    }


                } catch (e: any) {
                    if (e.code === 'ERR_CANCELED') {
                        // handle that the user canceled the sign-in flow

                    } else {
                        // handle other errors

                        Alert.alert(e.message)
                    }
                }
            }}
        />
    )
}

