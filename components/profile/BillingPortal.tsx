import React from 'react'
import { ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { getBillingPortalUrl } from '../../lib/useStripeHooks';
import * as Linking from 'expo-linking';
import { useNavigation } from '@react-navigation/native';
import { useUserContext } from '../../context/user';
import { getUser } from '../../lib/useAuthHooks';


type Props = {
    customer_id: string
}

export default function BillingPortal({ customer_id }: Props) {
    const [key, setKey] = React.useState(0)
    const redirectUrl = Linking.createURL('billing');
    const [closed, setClosed] = React.useState(false)
    const { user } = useUserContext()
    console.log(redirectUrl)
    const [url, setUrl] = React.useState<string | void>('')
    const navigation: any = useNavigation()


    React.useEffect(() => {
        getUrl()
    }, [])

    const getUrl = async () => {
        const url = await getBillingPortalUrl(customer_id)
        setUrl(url)
    }
    const handleNav = (newNavState: any) => {
        const { url } = newNavState;
        if (!url) return;

        if (url === 'https://www.kustomcharmz.com/profile') {
            navigation.navigate('Home')
            setKey(key + 1)
            getUser(user.id)
        }

    }


    if (!url) return <ActivityIndicator size="large" />

    return (
        <>
            <WebView
                style={{ flex: 1 }}
                source={{ uri: url }}
                onNavigationStateChange={(newNavState) => handleNav(newNavState)}
                key={key}
            />
        </>
    )
}
