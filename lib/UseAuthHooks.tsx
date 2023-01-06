import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { UserInfo } from './types';
import Constants from 'expo-constants';

const URL: string = Constants.expoConfig?.extra?.STAGING_API_URL


type Props = {
    isSignup?: boolean
    username: string
    password: string
}

type StoreProps = {
    value: UserInfo
    key: string
}


export const storeUser = async ({ value, key }: StoreProps) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
        Alert.alert('Something didnt go right')
    }
}

const storeAuthToken = async (value: string) => {
    try {
        await AsyncStorage.setItem('authToken', value)
    } catch (e) {
        Alert.alert('Something went wrong')
    }
}

export const removeItem = async (value: string) => {
    try {
        await AsyncStorage.removeItem(value)
    } catch (e) {
        Alert.alert('Something went wrong')
    }
}



export const checkIfUserExist = async (key: string) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        Alert.alert('Something didnt go rigth')
    }
}

export async function getUser(username: string, password: string) {


    let userbody = {
        username,
        password
    }

    try {
        const res = await fetch(URL + 'api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userbody),
        });
        // waits until the request completes...
        if (res.status === 200) {
            const user = await res.json();
            storeUser({
                value: user.user, key: 'user'
            })
            storeAuthToken(user.token)
            return user.user
        } else if (res.status === 401) {
            Alert.alert('Invalid username and password combination')
            return null
        }

    } catch (error: any) {
        Alert.alert(error.message)
    }

}

export async function Signup(username: string, password: string) {
    let userbody = {
        username,
        password
    }

    try {
        const res = await fetch(URL + 'api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userbody),
        });
        // waits until the request completes...
        if (res.status === 200) {
            const user = await res.json();
            return user
        } else {
            Alert.alert('Something went wrong')
            throw new Error("Something went wrong");
        }

    } catch (error: any) {
        Alert.alert(error.message)
    }
}

export async function getUserInfo(username: string) {

    let userbody = {
        username: username
    }


    try {
        const res = await fetch(URL + 'api/auth/getuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userbody)
        });
        // waits until the request completes...
        if (res.status === 200) {
            const user = await res.json();
            return user
        } else {
            Alert.alert('Something went wrong')
            throw new Error("Something went wrong");
        }

    } catch (error: any) {
        Alert.alert(error.message)
    }
}
export async function getCustomerInfo(customer_id: string) {

    let userbody = {
        customer_id: customer_id
    }

    try {
        const res = await fetch(URL + 'api/payments/customerinfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userbody)
        });
        // waits until the request completes...
        if (res.status === 200) {
            const customer = await res.json();
            return customer
        } else {
            Alert.alert('Something went wrong')
            throw new Error("Something went wrong");
        }

    } catch (error: any) {
        Alert.alert(error.message)
    }
}



