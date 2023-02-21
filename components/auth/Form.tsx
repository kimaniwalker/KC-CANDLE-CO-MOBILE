import React from 'react'
import { Alert, KeyboardAvoidingView, ScrollView, Text } from 'react-native'
import { useToast } from 'react-native-toast-notifications'
import styled from 'styled-components/native'
import { useUserContext } from '../../context/user'
import { createNewUser, getUser, storeUser } from '../../lib/useAuthHooks'
import { Fonts } from '../../styles/Fonts'
import StyledButton from '../../styles/StyledButton'
import Header from '../home/Header'
import { useForm, Controller } from "react-hook-form";
import { Colors } from '../../styles/Colors'
import Constants from 'expo-constants';
import { supabase } from '../../lib/supabase'
import { createNewCalendar } from '../../lib/useCalendarHooks'


type Props = {
    isSignup: boolean
    setShowSignUp: (value: boolean) => void
    showSignUp: boolean
}
export default function Form({ isSignup, setShowSignUp, showSignUp }: Props) {

    const ENV = Constants.expoConfig?.extra?.APP_ENV
    const URL: string = ENV === 'production' ? Constants.expoConfig?.extra?.PRODUCTION_API_URL : Constants.expoConfig?.extra?.STAGING_API_URL

    const { user, setUser, setLoggedIn } = useUserContext()
    const toast = useToast()
    const { control, handleSubmit, formState: { errors, isValid } } = useForm({
        defaultValues: {
            username: '',
            password: ''
        },
        mode: 'onChange'
    });

    const [loading, setLoading] = React.useState(false)

    async function signUpWithEmail() {
        setLoading(true)
        const { error, data } = await supabase.auth.signUp({
            email: control._formValues.username,
            password: control._formValues.password,
        })
        console.log(data)
        if (error) {
            Alert.alert(error.message)
        } else {
            if (data.user) {
                await createNewCalendar(data.user.id)
                await createNewUser(data.user)
            }
            toast.show('Your user was created successfully. Now log in.', {
                type: "success",
                placement: "bottom",
                duration: 4000,
                animationType: "slide-in",
            })
            setShowSignUp(!showSignUp)
        }
        setLoading(false)
    }
    async function signInWithEmail() {
        setLoading(true)
        const { data, error } = await supabase.auth.signInWithPassword({
            email: control._formValues.username,
            password: control._formValues.password,
        })

        if (error) Alert.alert(error.message)
        if (data.session) {
            const user = await getUser(data.session.user.id)
            setLoggedIn(true)
            if (user) {
                setUser(user[0])
                storeUser({ value: user[0], key: 'user' })
            }
        }
        setLoading(false)
    }


    const handlePress = isSignup ? signUpWithEmail : signInWithEmail
    const title = isSignup ? 'Sign Up' : 'Login'
    const subheading = isSignup ? 'Join our vip group and get exclusive deals and discounts' : 'Log back in and continue enjoying exclusive deals and discounts'
    const signInOption = isSignup ? 'Already a member ? Log back in by pressing here' : 'Don`t have an account yet ? Sign up and enjoy exclusive deals and membership perks by pressing here.'
    const buttonTitle = isSignup ? 'Sign up' : 'Login'

    if (loading) return <Text>Loading</Text>
    return (
        <>

            <ScrollView>
                <KeyboardAvoidingView behavior='position'>
                    <Header />
                    <Wrapper>
                        <Content>
                            <Title>{title}</Title>
                            <Subheading>{subheading}</Subheading>
                            <Label>Email</Label>
                            {errors.username && <ErrMessage>{errors.username?.message}</ErrMessage>}
                            <Controller
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Please enter your email address'
                                    },
                                    pattern: {
                                        value: /^\S+@\S+$/,
                                        message: 'Must be a valid email address'
                                    },
                                }}
                                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                                    <Input
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder="username"
                                        isDirty={error ? true : false}
                                    />

                                )}
                                name="username"
                            />

                            <Label>Password</Label>
                            {errors.password && <ErrMessage>{errors.password?.message}</ErrMessage>}
                            <Controller
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'This is a required field'
                                    },
                                    minLength: {
                                        value: 8,
                                        message: 'Must contain at least 8 characters'
                                    },
                                }}
                                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                                    <Input
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        onChangeText={onChange}
                                        value={value}
                                        secureTextEntry
                                        placeholder="password"
                                        isDirty={error ? true : false} />
                                )}
                                name="password"
                            />

                            <SignInView>
                                <SignInButton onPress={() => setShowSignUp(!showSignUp)}>
                                    <SignInOption>{signInOption}</SignInOption>
                                </SignInButton>
                            </SignInView>
                        </Content>
                        <StyledButton buttonTitle={buttonTitle} onPress={handleSubmit(handlePress)} disabled={!isValid} />


                    </Wrapper>
                </KeyboardAvoidingView>
            </ScrollView>

        </>
    )
}

const Input = styled.TextInput<{ isDirty?: boolean }>`  
    width: 100%;
    height: 50px;
    margin: 10px 0;
    border: 2px solid black;
    border-color: ${props => props.isDirty ? Colors.error : Colors.dark};
    border-radius: 8px;
    font-family: ${Fonts.medium};
    padding: 0 16px;
`
const Content = styled.View`
    width: 100%;
    min-height: 250px;
    padding: 20px;

`
const Wrapper = styled.View`
    justify-content: space-between;
    align-items: center;
    align-content: center;
`
const Title = styled.Text`
    font-size: 32px;
    margin-bottom: 20px;
    font-family: ${Fonts.bold};
`
const Subheading = styled.Text`
    margin-bottom: 24px;
    font-family: ${Fonts.medium};
    font-size: 18px;
`
const SignInOption = styled.Text`
    margin-top: 24px;
    font-family: ${Fonts.medium};
    font-size: 16px;
`
const SignInView = styled.View`
    width: 100%;
`
const SignInButton = styled.Pressable`
    
`

const ErrMessage = styled.Text`
     font-family: ${Fonts.medium};
        font-size: 16px;
        align-self: flex-start;
        color: ${Colors.error};
        padding-top: 4px;
`
const Label = styled.Text`
        font-family: ${Fonts.medium};
        font-size: 16px;
        align-self: flex-start;
        
`
