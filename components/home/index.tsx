import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { ScrollView } from 'react-native';
import { useUserContext } from '../../context/user';
import { registerForPushNotificationsAsync } from '../../lib/permissions';
import AuthSelection from '../auth/AuthSelection';
import Form from '../auth/Form';
import Collections from './Collections';
import Featured from './Featured';
import FeaturedProducts from './FeaturedProducts';
import Header from './Header';
import Hero from './Hero';
import PromoBanner from './PromoBanner';

export default function Home() {
    const { loggedIn } = useUserContext()
    const [showSignUp, setShowSignUp] = React.useState(false)
    const navigation: any = useNavigation()

    React.useLayoutEffect(() => {
        registerForPushNotificationsAsync()
    }, [])

    const MobileHome = (
        <>
            <PromoBanner message='Become a Vip member and receive exclusive deals and discounts' messagecolor='white' />
            <Header />
            <ScrollView>
                <Hero />
                <Featured heading='Gift a candle to that special person' description='Become a vip member and get exclusive deals and discounts' buttonTitle='Shop Now' handlePress={() => navigation.navigate('Shop')} />
                <FeaturedProducts headingVisible={true} />
                <Collections />
            </ScrollView>

        </>
    )

    if (loggedIn) return MobileHome
    if (showSignUp) return <Form isSignup={true} setShowSignUp={setShowSignUp} showSignUp={showSignUp} />
    return (
        <>
            {/* <Form isSignup={false} setShowSignUp={setShowSignUp} showSignUp={showSignUp} /> */}
            <AuthSelection />
        </>
    )
}
