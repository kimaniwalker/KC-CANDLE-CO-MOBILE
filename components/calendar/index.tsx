import React from 'react'
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';



export default function Calendar() {

    const [key, setKey] = React.useState(0)

    const navigation: any = useNavigation();



    const handleNav = (newNavState: any) => {
        const { url } = newNavState;
        if (!url) return;

        if (url !== 'http://www.localhost:3000/vip/calendar') {
            setKey(key + 1)
        }

    }


    return (
        <>
            <WebView
                style={{ flex: 1 }}
                source={{ uri: 'http://www.localhost:3000/vip/calendar' }}
                onNavigationStateChange={(newNavState) => handleNav(newNavState)}
                key={key}
            />
        </>
    )
}
