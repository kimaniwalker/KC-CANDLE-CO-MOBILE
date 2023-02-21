import { Alert } from "react-native";
import { UserUpdateProps, UserProps } from "./types";
import Constants from 'expo-constants';
import { supabase } from "./supabase";

const ENV = Constants.expoConfig?.extra?.APP_ENV
const URL: string = ENV === 'production' ? Constants.expoConfig?.extra?.PRODUCTION_API_URL : Constants.expoConfig?.extra?.STAGING_API_URL



/**
 * User Functions Listed Here To Create , Update , Delete , User Records
 */


export async function updateUser({ user }: UserUpdateProps) {


    try {
        const { error } = await supabase
            .from('users')
            .update(user)
            .eq('id', user.id)

        if (error) {
            Alert.alert(error.message)
            return error
        }
        return null

    } catch (error: any) {
        Alert.alert(error.message)
    }

}

export async function updateUserByEmail({ user }: UserProps) {

    let results = await updateUserByEmail({
        user: {
            id: '',
            username: '',
            phone: '',
            address: '',
            customer_id: '',
            role: '',
            push_token: ''
        }
    })


    try {
        const res = await fetch(URL + 'api/auth/updateuserbyemail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        });
        // waits until the request completes...
        if (res.status === 200) {
            const user = await res.json();
            return user

        } else if (res.status === 401) {
            Alert.alert('Invalid username and password combination')
            return null
        }

    } catch (error: any) {
        Alert.alert(error.message)
    }

}




export function useUserHook() {
    const userFunctions = {
        updateUser
    }
    return userFunctions
}