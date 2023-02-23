import { ActivityIndicator, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { StripeProvider } from '@stripe/stripe-react-native';
import { initStripe } from '@stripe/stripe-react-native';
import React from 'react';
import { UserWrapper, useUserContext } from './context/user';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const ENV = 'production'
  const KEY: string = ENV === 'production' ? Constants.expoConfig?.extra?.STRIPEPK_PRODUCTION : Constants.expoConfig?.extra?.STRIPEPK_STAGING
  const notificationListener = React.useRef<any>();
  const responseListener = React.useRef<any>();
  const [notification, setNotification] = React.useState<any>(false);

  React.useEffect(() => {
    initStripe({
      publishableKey: KEY,
      merchantIdentifier: 'merchant.kustomcharmz.kcmobileapp',
      urlScheme: "kcmobile",
    });

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification)
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
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
        publishableKey={KEY}
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


