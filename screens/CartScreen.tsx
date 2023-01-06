import React from 'react'
import { useCartContext } from '../context/cart';
import { usePaymentFunctions } from '../lib/useStripeHooks';
import { Alert, ScrollView, Text } from 'react-native';
import CartTotal from '../components/cart/CartTotal';
import CartItems from '../components/cart/CartItems';
import styled from 'styled-components/native';
import { useStripe } from "@stripe/stripe-react-native";
import { useUserContext } from '../context/user';
import { Colors } from '../styles/Colors';
import Header from '../components/home/Header';
import FeaturedProducts from '../components/home/FeaturedProducts';
import Featured from '../components/home/Featured';
import Form from '../components/auth/Form';
import HomeScreen from './HomeScreen';
import SignUpScreen from './SignUpScreen';
import CollectShippingScreen from './CollectShippingScreen';
import { Fonts } from '../styles/Fonts';
import Constants from 'expo-constants';


export default function CartScreen({ navigation }: any) {
    const ENV = Constants.expoConfig?.extra?.APP_ENV
    const URL: string = ENV === 'production' ? Constants.expoConfig?.extra?.PRODUCTION_API_URL : Constants.expoConfig?.extra?.STAGING_API_URL
    const { cart, metadata, appleParams, clearCartItems } = useCartContext()
    const { user, getUser, setUser } = useUserContext()
    const total = cart?.reduce((total: number, product: any) => total + (product.price * product.qty), 0)
    const { initPaymentSheet, presentPaymentSheet } = useStripe()
    const [loading, setLoading] = React.useState(false)
    const [isReady, setIsReady] = React.useState(false)
    const shipping = user.customer_id ? 0 : 8

    const monthlySubscriptionFound = cart.find((element: { description: string }) => element.description === 'KC CANDLE CO SUBSCRIPTION M')
    const yearlySubscriptionFound = cart.find((element: { description: string }) => element.description === 'KC CANDLE CO SUBSCRIPTION Y')


    const monthlyDescripton = monthlySubscriptionFound ? 'KC CANDLE CO SUBSCRIPTION M' : 'KC CANDLE CO Order'
    const yearlyDescription = yearlySubscriptionFound ? 'KC CANDLE CO SUBSCRIPTION Y' : 'KC CANDLE CO Order'

    const description = monthlySubscriptionFound ? monthlyDescripton : yearlySubscriptionFound ? yearlyDescription : 'KC CANDLE CO order'

    const fetchPaymentSheetParams = async () => {

        const paymentinfo = {
            amount: total * 100 + shipping * 100,
            customer_id: user.customer_id,
            username: user.username,
            description: description,
            metadata: metadata,
            address: user.address,
            phone: user.phone
        }
        const response = await fetch(URL + `api/payments/kcmobile/order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentinfo)
        });
        const { paymentIntent, ephemeralKey, customer } = await response.json();

        return {
            paymentIntent,
            ephemeralKey,
            customer,
        };



    };

    const initializePaymentSheet = async () => {


        const {
            paymentIntent,
            ephemeralKey,
            customer,
        } = await fetchPaymentSheetParams();

        const { error } = await initPaymentSheet({
            merchantDisplayName: "KC CANDLE CO",
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
            //methods that complete payment after a delay, like SEPA Debit and Sofort.
            allowsDelayedPaymentMethods: true,
            applePay: {
                merchantCountryCode: '35080',
                paymentSummaryItems: [appleParams]
            },
            appearance: {
                colors: {
                    primary: Colors.primary,
                    background: Colors.white,
                    componentBackground: '#ffffff',
                    componentBorder: Colors.dark,
                    componentDivider: Colors.dark,
                    primaryText: Colors.dark,
                    secondaryText: Colors.dark,
                    componentText: Colors.dark,
                    placeholderText: Colors.dark,
                    icon: Colors.primary,
                    error: Colors.error
                },
                font: {
                    family: 'Avenir',
                    scale: 1.2,
                },
                primaryButton: {
                    colors: {
                        background: Colors.green500,
                        text: Colors.white,
                        border: Colors.dark,
                    },
                    font: {
                        family: 'Avenir'
                    },
                    shapes: {
                        borderRadius: 8,
                        borderWidth: .5,
                        shadow: {
                            color: Colors.dark,
                            opacity: .5
                        }
                    },

                },
            }




        })

        if (!error) {
            setLoading(true);

        } else {
            console.log(error)
        }
    };

    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet();

        if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
            Alert.alert(
                "Success",
                "We received your order. You will receive an email with your receipt shortly. Thank you for shopping with KC Candle Co,",
                [
                    {
                        text: "OK", onPress: () => {
                            clearCartItems()
                            getUser()
                            navigation.navigate('Home')
                        }
                    }
                ]
            );

        }
    };

    React.useEffect(() => {
        initializePaymentSheet();
    }, []);
    React.useEffect(() => {
        initializePaymentSheet();
    }, ['cart', cart, user]);


    const EmptyCart = (
        <>
            <Header />
            <ScrollView>

                <CartWrapper>

                    <TextItem>You don't have any items in your cart. Add a item to your cart to get started.</TextItem>
                    <FeaturedProducts headingVisible={false} />
                </CartWrapper>
            </ScrollView>
        </>
    )

    if (cart.length < 1) return EmptyCart
    if (!user.username) return <HomeScreen />
    if (!user.address) return <CollectShippingScreen />
    return (
        <>
            <Header />
            <ScrollView>
                <Wrapper>

                    <CartTotal disabled={loading} total={total} onCheckout={openPaymentSheet} />


                    {cart && (
                        cart.map((item: any, index: KeyType) => (
                            <CartItems key={index} {...item} />
                        ))
                    )}

                </Wrapper></ScrollView>
        </>
    )
}

const Wrapper = styled.View`
    padding: 16px;
`
const TextItem = styled.Text`
     font-size: 32px;
    font-family: ${Fonts.bold};
    text-align: center;
`
const CartWrapper = styled.View`
    margin: 16px auto;
    padding: 16px;
`
