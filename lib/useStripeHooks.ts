import { Alert } from "react-native";
import { useStripe } from "@stripe/stripe-react-native";
import Constants from 'expo-constants';

const ENV = Constants.expoConfig?.extra?.APP_ENV
const URL: string = ENV === 'production' ? Constants.expoConfig?.extra?.PRODUCTION_API_URL : Constants.expoConfig?.extra?.STAGING_API_URL


export async function getBillingPortalUrl(customer_id: string, return_url?: string) {
    let body = {
        customer_id: customer_id,
        return_url: return_url
    }

    try {
        const res = await fetch(URL + 'api/payments/customerportal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),

        })
        if (res.status === 200) {
            const data = await res.json()
            return data.url
        } else {
            throw new Error("Couldn't find any customer details");
        }

    } catch (error: any) {
        Alert.alert(error.message)
    }
}

export async function getCustomerDetails(customer_id: string) {

    let body = {
        customer_id: customer_id
    }

    try {
        const res = await fetch(URL + 'api/payments/customerinfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),

        })
        if (res.status === 200) {
            const data = await res.json()
            return data
        } else {
            throw new Error("Couldn't find any customer details");
        }

    } catch (error: any) {
        Alert.alert(error.message)
    }
}




export async function fetchPaymentSheetParams() {
    const response = await fetch(URL + `api/payments/kcmobile/createPaymentIntent`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const { paymentIntent, ephemeralKey, customer } = await response.json();

    return {
        paymentIntent,
        ephemeralKey,
        customer,
    };
};

export async function initializePaymentSheet() {
    const { initPaymentSheet } = useStripe();

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
        defaultBillingDetails: {
            name: 'Jane Doe',
        }
    });
    if (error) {
        Alert.alert(error.message)
    }
};

export async function openPaymentSheet() {
    const { presentPaymentSheet } = useStripe();
    const { error } = await presentPaymentSheet();

    if (error) {
        Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
        Alert.alert('Success', 'Your order is confirmed!');


    }
};

export function usePaymentFunctions() {
    return { initializePaymentSheet, openPaymentSheet }
}
