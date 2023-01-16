export default () => {
    return {
        expo: {
            name: "KC CANDLE CO",
            owner: "kimaniwalker",
            slug: "kcmobile",
            version: "1.0.0",
            orientation: "portrait",
            icon: "./assets/KCICON.png",
            userInterfaceStyle: "light",
            splash: {
                image: "./assets/KCMOBILESPLASH.png",
                resizeMode: "cover",
                backgroundColor: "#ffffff"
            },
            scheme: "kcmobile",
            plugins: [
                [
                    "@stripe/stripe-react-native",
                    {
                        merchantIdentifier: "merchant.kustomcharmz.kcmobileapp",
                        enableGooglePay: true
                    }
                ]
            ],
            updates: {
                fallbackToCacheTimeout: 0,
                checkAutomatically: "ON_LOAD",
                enabled: true,
                url: "https://u.expo.dev/7b217932-14e6-4fdd-8d52-b0d11c117410"
            },
            runtimeVersion: {
                "policy": "sdkVersion"
            },
            assetBundlePatterns: [
                "**/*"
            ],
            ios: {
                supportsTablet: true,
                bundleIdentifier: 'kustomcharmz.kcmobileapp',
                infoPlist: {
                    NSCameraUsageDescription: "This app uses the camera to scan cards for payments through Stripe."
                }
            },
            android: {
                adaptiveIcon: {
                    foregroundImage: "./assets/adaptive-icon.png",
                    backgroundColor: "#FFFFFF"
                },
                package: 'kustomcharmz.kcmobileapp',
                versionCode: 1
            },
            web: {
                favicon: "./assets/favicon.png"
            },
            extra: {
                APP_ENV: process.env.APP_ENV,
                PRODUCTION_API_URL: "https://www.kustomcharmz.com/",
                STAGING_API_URL: "http://localhost:3000/",
                STRIPEPK_STAGING: "pk_test_51JSByuLJedda0w0cpVrGNZaPuQV6AmVhIX0fVJipuqFC31xAKtw9XyhzNFk1uHKuv1RxlLWzS2CajNeaem8Zg3xm00Ndb4NnaK",
                STRIPEPK_PRODUCTION: "pk_live_51JSByuLJedda0w0cMz6MiaVtj7iv6KcTPOjjiKHAmAM7td7NPY0tN2hIUT2CP6UVzp6GUVMQ81InvlNJZAwxFxjd00Xt4ZLdg5",
                eas: {
                    "projectId": "7b217932-14e6-4fdd-8d52-b0d11c117410"
                }
            }
        }

    };
};