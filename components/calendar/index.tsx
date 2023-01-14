import React from 'react'
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';




export default function Calendar() {
    const ENV = Constants.expoConfig?.extra?.APP_ENV
    const URL: string = ENV === 'production' ? Constants.expoConfig?.extra?.PRODUCTION_API_URL : Constants.expoConfig?.extra?.STAGING_API_URL

    const [key, setKey] = React.useState(0)

    const navigation: any = useNavigation();



    const handleNav = (newNavState: any) => {
        const { url } = newNavState;
        if (!url) return;

        if (url !== `${URL}vip/calendar`) {
            setKey(key + 1)
        }

    }


    return (
        <>
            <WebView
                style={{ flex: 1 }}
                source={{ uri: `${URL}vip/calendar` }}
                onNavigationStateChange={(newNavState) => handleNav(newNavState)}
                key={key}
            />
        </>
    )
}
