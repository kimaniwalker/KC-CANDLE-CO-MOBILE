export default () => {
    return {
        name: "kcmobile",
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
        },
        assetBundlePatterns: [
            "**/*"
        ],
        ios: {
            supportsTablet: true
        },
        android: {
            adaptiveIcon: {
                foregroundImage: "./assets/adaptive-icon.png",
                backgroundColor: "#FFFFFF"
            }
        },
        web: {
            favicon: "./assets/favicon.png"
        },
        extra: {
            APP_ENV: process.env.APP_ENV,
            PRODUCTION_API_URL: "https://www.kustomcharmz.com/",
            STAGING_API_URL: "http://localhost:3000/"
        }
    };
};