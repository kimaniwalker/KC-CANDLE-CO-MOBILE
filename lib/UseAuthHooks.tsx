import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { UserInfo } from './types';
import Constants from 'expo-constants';
import { supabase } from './supabase';

const ENV = "production"
const URL: string = ENV === "production" ? Constants.expoConfig?.extra?.PRODUCTION_API_URL : Constants.expoConfig?.extra?.STAGING_API_URL


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

export const getUser = async (id: string | number) => {
    const { data, error } = await supabase
        .from('users')
        .select()
        .eq('id', id)

    if (error) {
        Alert.alert(error.message)
        return
    }
    return data

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

export async function deleteUser(id: string) {

    let userbody = {
        id: id
    }


    try {
        const res = await fetch(URL + 'api/auth/deleteUser', {
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

export const createNewUser = async (user: any) => {

    const body = {
        id: user.id,
        address: '',
        customer_id: '',
        phone: user.phone,
        username: user.email,
        role: 'shopper'
    }

    try {
        const { error } = await supabase
            .from('users')
            .insert(body)

        if (error) {
            Alert.alert(error.message)
        }

    } catch (error) {
        console.error('An unexpected error happened occurred:', error)

    }
}

