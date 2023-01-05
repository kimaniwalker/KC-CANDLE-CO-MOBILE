import React from 'react'
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import AllProducts from './Products';
import ProductImages from './ProductImages';


export default function Shop() {

    const [key, setKey] = React.useState(0)

    const navigation: any = useNavigation();


    const handleNav = (newNavState: any) => {
        const { url } = newNavState;

        if (!url) return;



    }
    const Web = (
        <WebView
            style={{ flex: 1 }}
            source={{ uri: 'http://www.localhost:3000/products' }}
            key={key}
            onNavigationStateChange={(newNavState) => handleNav(newNavState)}
        />
    )

    const mobile = (
        <>

            <AllProducts />

        </>
    )

    return mobile
}
