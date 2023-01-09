import { ActivityIndicator, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { StripeProvider } from '@stripe/stripe-react-native';
import PaymentScreen from './PaymentScreen';
import { initStripe } from '@stripe/stripe-react-native';
import React from 'react';
import SignUpOption from './components/payments/SignUpOption';
import CheckoutScreen from './components/profile/SubscriptionSignup';
import { UserWrapper, useUserContext } from './context/user';
import Form from './components/auth/Form';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import BillingScreen from './screens/BillingScreen';
import CalendarScreen from './screens/CalendarScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  useFonts,
  Montserrat_500Medium,
  Montserrat_800ExtraBold,
  Montserrat_100Thin,
} from '@expo-google-fonts/montserrat';
import { Colors } from './styles/Colors';
import HomeScreen from './screens/HomeScreen';
import ShopScreen from './screens/ShopScreen';
import TermsScreen from './screens/Terms';
import { CartWrapper } from './context/cart';
import SingleProduct from './components/shop/SingleProduct';
import CartScreen from './screens/CartScreen';
import { ToastProvider } from 'react-native-toast-notifications'
import CollectShippingScreen from './screens/CollectShippingScreen';
import Header from './components/home/Header';


export default function App() {


  React.useEffect(() => {
    initStripe({
      publishableKey: "pk_test_51JSByuLJedda0w0cpVrGNZaPuQV6AmVhIX0fVJipuqFC31xAKtw9XyhzNFk1uHKuv1RxlLWzS2CajNeaem8Zg3xm00Ndb4NnaK",
      merchantIdentifier: 'merchant.kustomcharmz.kcmobileapp',
      urlScheme: "kcmobile",
    });

  }, []);

  const { loggedIn } = useUserContext()
  let [fontsLoaded] = useFonts({
    Montserrat_500Medium,
    Montserrat_100Thin,
    Montserrat_800ExtraBold
  });

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();


  const Home = () => (

    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={{
        headerShown: false,
        tabBarActiveTintColor: `${Colors.success}`,
        tabBarIcon: ({ color, size, focused }) => (<MaterialCommunityIcons name="home-city-outline" size={32} color="black" />)
      }} />
      <Tab.Screen name="Calendar" component={CalendarScreen}
        options={{
          headerShown: false,
          tabBarActiveTintColor: `${Colors.success}`,
          tabBarIcon: ({ color, size, focused }) => (<MaterialCommunityIcons name="calendar-edit" size={32} color="black" />)
        }} />
      <Tab.Screen name="Shop" component={ShopScreen}
        options={{
          headerShown: false,
          tabBarActiveTintColor: `${Colors.success}`,
          tabBarIcon: ({ color, size, focused }) => (<MaterialCommunityIcons name="store-outline" size={32} color="black" />)
        }} />
      <Tab.Screen name="Terms" component={TermsScreen}
        options={{
          headerShown: false,
          tabBarActiveTintColor: `${Colors.success}`,
          tabBarIcon: ({ color, size, focused }) => (<MaterialCommunityIcons name="file-document-multiple-outline" size={32} color="black" />)
        }} />

      <Tab.Screen name="Account" component={ProfileScreen} options={{
        headerShown: false,
        tabBarActiveTintColor: `${Colors.success}`,
        tabBarIcon: ({ color, size, focused }) => (<MaterialCommunityIcons name="account-circle-outline" size={32} color="black" />)
      }} />
      <Tab.Screen name="SingleProduct" component={SingleProduct} options={{
        headerShown: false,
        tabBarItemStyle: { position: 'absolute' },
        tabBarIconStyle: { display: 'none' },

        tabBarLabelStyle: { display: 'none' },
        tabBarActiveTintColor: `${Colors.success}`,
        tabBarIcon: ({ color, size, focused }) => (<MaterialCommunityIcons name="account-circle-outline" size={32} color="black" />)

      }} />
      <Tab.Screen name="Cart" component={CartScreen} options={{
        headerShown: false,
        tabBarItemStyle: { position: 'absolute' },
        tabBarIconStyle: { display: 'none' },

        tabBarLabelStyle: { display: 'none' },
        tabBarActiveTintColor: `${Colors.success}`,
        tabBarIcon: ({ color, size, focused }) => (<MaterialCommunityIcons name="account-circle-outline" size={32} color="black" />)

      }} />
      <Tab.Screen name="Billing" component={BillingScreen} options={{
        headerShown: false,
        tabBarItemStyle: { position: 'absolute' },
        tabBarIconStyle: { display: 'none' },

        tabBarLabelStyle: { display: 'none' },
        tabBarActiveTintColor: `${Colors.success}`,
        tabBarIcon: ({ color, size, focused }) => (<MaterialCommunityIcons name="account-circle-outline" size={32} color="black" />)

      }} />
      <Tab.Screen name="CollectShippingInfo" component={CollectShippingScreen} options={{
        headerShown: false,
        tabBarItemStyle: { position: 'absolute' },
        tabBarIconStyle: { display: 'none' },

        tabBarLabelStyle: { display: 'none' },
        tabBarActiveTintColor: `${Colors.success}`,
        tabBarIcon: ({ color, size, focused }) => (<MaterialCommunityIcons name="account-circle-outline" size={32} color="black" />)

      }} />

    </Tab.Navigator>

  )

  const HomeUnauthenticated = () => (

    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={{
        headerShown: false,
        tabBarActiveTintColor: `${Colors.success}`,
        tabBarIcon: ({ color, size, focused }) => (<MaterialCommunityIcons name="home-city-outline" size={32} color="black" />)
      }} />

      <Tab.Screen name="Shop" component={ShopScreen}
        options={{
          headerShown: false,
          tabBarActiveTintColor: `${Colors.success}`,
          tabBarIcon: ({ color, size, focused }) => (<MaterialCommunityIcons name="store-outline" size={32} color="black" />)
        }} />
      <Tab.Screen name="Terms" component={CalendarScreen}
        options={{
          headerShown: false,
          tabBarActiveTintColor: `${Colors.success}`,
          tabBarIcon: ({ color, size, focused }) => (<MaterialCommunityIcons name="file-document-multiple-outline" size={32} color="black" />)
        }} />


    </Tab.Navigator>

  )

  const HomePage = Home

  if (!fontsLoaded) return <ActivityIndicator size='large' />
  return (
    <>
      <StatusBar barStyle="light-content" />
      <StripeProvider
        publishableKey="pk_live_51JSByuLJedda0w0cMz6MiaVtj7iv6KcTPOjjiKHAmAM7td7NPY0tN2hIUT2CP6UVzp6GUVMQ81InvlNJZAwxFxjd00Xt4ZLdg5"
        merchantIdentifier="merchant.kustomcharmz.kcmobileapp"
      >
        <ToastProvider>
          <UserWrapper>
            <CartWrapper>
              <NavigationContainer>
                <Stack.Navigator>
                  <Stack.Screen options={{
                    headerTransparent: true,
                    headerShown: false
                  }} name="KC CANDLE CO" component={HomePage} />
                </Stack.Navigator>
              </NavigationContainer>
            </CartWrapper>
          </UserWrapper>
        </ToastProvider>
      </StripeProvider>
    </>
  );
}


