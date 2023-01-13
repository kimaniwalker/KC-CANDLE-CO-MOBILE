import { useStripe } from "@stripe/stripe-react-native";
import React from "react";
import { Alert, SafeAreaView, ScrollView } from "react-native";
import styled from "styled-components/native";
import OptionCard from "../payments/OptionCard";
import { useUserContext } from "../../context/user";
import { Colors } from "../../styles/Colors";
import MembershipPerks from "./MembershipPerks";
import Header from "../home/Header";
import { useCartContext } from "../../context/cart";
import { useNavigation } from "@react-navigation/native";
import { Fonts } from "../../styles/Fonts";
export default function CheckoutScreen() {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const { loggedIn, setLoggedIn, user, setUser } = useUserContext()
    const [loading, setLoading] = React.useState(false);
    const [selected, setSelected] = React.useState<number>(2000)
    const { addToCart } = useCartContext()
    const navigation: any = useNavigation()


    const openPaymentSheetMonthly = async () => {


        addToCart(
            {
                id: 95,
                title: "Monthly Subscription",
                price: 20,
                qty: 1,
                size: 'Monthly',
                isAvailable: false,
                description: "KC CANDLE CO SUBSCRIPTION M",
                disclaimer: "",
                category: "membership",
                images: [
                    require('../../assets/product-images/KCSUBSCRIPTION.png')
                ],
                rating: {
                    rate: 3.9,
                    count: 120
                },

            },
        )

    }; const openPaymentSheetYearly = async () => {
        addToCart(
            {
                id: 95,
                title: "Yearly Subscription",
                price: 140,
                size: 'Yearly',
                qty: 1,
                isAvailable: false,
                description: "KC CANDLE CO SUBSCRIPTION Y",
                disclaimer: "",
                category: "membership",
                images: [
                    require('../../assets/product-images/KCSUBSCRIPTION.png')
                ],
                rating: {
                    rate: 3.9,
                    count: 120
                },

            },
        )

        Alert.alert(
            "Create an account",
            "You must create an account to get started. We will collect your shipping information and telephone number for future orders.",
            [
                {
                    text: "OK", onPress: () => {

                        navigation.navigate('Home')
                    }
                }
            ]
        );

    };

    const heading = `Choose\n your plan`
    const subheading = `Get exclusive\ndeals and discounts\nwith monthly billing`


    return (
        <>
            <Header />
            <ScrollView>
                <Wrapper>
                    <SafeAreaView>
                        <Heading>{heading}</Heading>
                        <SubHeading>{subheading}</SubHeading>




                        <OptionCard title="Monthly" buttonTitle="Purchase" subheading="" onPress={openPaymentSheetMonthly} price="20$" duration="/ per month" disabled={false}
                            children={<MembershipPerks />} />
                        <OptionCard title="Yearly" buttonTitle="Purchase" subheading="Best Deal" onPress={openPaymentSheetYearly} price="140$" duration="/ per year" disabled={false} children={<MembershipPerks />} />





                    </SafeAreaView>
                </Wrapper>
            </ScrollView>
        </>



    );
}



const Wrapper = styled.View`
    flex: 1;
    padding: 20px;
    justify-content: 'center';
`
const Heading = styled.Text`
    font-size: 48px;
    text-align: center;
    margin-bottom: 16px;
     font-family: ${Fonts.bold};
     white-space: pre-line;
    
`
const SubHeading = styled.Text`
    font-size: 32px;
    text-align: center;
    margin-bottom: 16px;
       font-family: ${Fonts.thin};
       color: ${Colors.dark};
       white-space: pre-line;
    
`

