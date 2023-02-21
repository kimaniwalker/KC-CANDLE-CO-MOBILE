import { Alert } from "react-native"
import { supabase } from "./supabase"

export const createNewCalendar = async (id: number | string) => {

    const body = {
        userid: id,
        january: 'Luxery Linen',
        febuary: 'Caribbean Coconut',
        march: 'Beach Bohemian',
        april: 'Cannabis Flower',
        may: 'Strawberry Poundcake',
        june: 'Black Ice',
        july: 'Coconut Lime',
        august: 'French Vanilla',
        september: 'Birthday Cake',
        october: 'Witches Brew',
        november: 'Amour Autumn',
        december: 'Hot Apple Pie'
    }

    try {
        const { data, error } = await supabase
            .from('user_calendar')
            .insert(body)
        if (error) {
            Alert.alert(error.message)
        }
        if (data) {
            console.log('Calendar created')
        }

    } catch (error) {
        console.error('An unexpected error happened occurred:', error)

    }
}

export const getUserCalendar = async (userid: string | number) => {

    const { data, error } = await supabase
        .from('user_calendar')
        .select()
        .eq('userid', userid)

    if (error) {
        Alert.alert(error.message)
    }

    return data
}

export const updateCalendar = async (data: any) => {

    const { error } = await supabase
        .from('user_calendar')
        .update(data)
        .eq('userid', data.userid)

    if (error) {
        Alert.alert(error.message)
        return error
    }

    return null

}