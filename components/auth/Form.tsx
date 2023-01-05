import React from 'react'
import { SafeAreaView } from 'react-native'
import { useToast } from 'react-native-toast-notifications'
import styled from 'styled-components/native'
import { useUserContext } from '../../context/user'
import { getUser, Signup, storeUser } from '../../lib/UseAuthHooks'
import { Fonts } from '../../styles/Fonts'
import StyledButton from '../../styles/StyledButton'
import Header from '../home/Header'
import { useForm, Controller } from "react-hook-form";
import { Colors } from '../../styles/Colors'



type Props = {
    isSignup: boolean
    setShowSignUp: (value: boolean) => void
    showSignUp: boolean
}
export default function Form({ isSignup, setShowSignUp, showSignUp }: Props) {

    const { user, setUser, setLoggedIn } = useUserContext()
    const toast = useToast()
    const { control, handleSubmit, formState: { errors, isValid } } = useForm({
        defaultValues: {
            username: '',
            password: ''
        },
        mode: 'onChange'
    });

    const handleLogin = async () => {

        const user = await getUser(control._formValues.username, control._formValues.password)
        if (user) {
            setLoggedIn(true)
            setUser(user)
            storeUser({ value: user, key: 'user' })
        }
    }
    const createNewCalendar = async (id: number) => {

        const body = {
            userid: id,
            january: 'Luxery Linen',
            febuary: 'Caribbean Coconut',
            march: 'Beach Bohemian',
            april: 'Cannabis Flower',
            may: 'Strawberry Poundcake',
            june: 'Black Ice',
            july: 'Coconut Lime',
            august: 'French Vanilla',
            september: 'Birthday Cake',
            october: 'Witches Brew',
            november: 'Amour Autumn',
            december: 'Hot Apple Pie'
        }

        try {
            const res = await fetch(`http://www.localhost:3000/api/vip/createNewCalendar`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })
            if (res.status === 200) {
                const msg = await res.json()



            } else {
                throw new Error(await res.text())
            }
        } catch (error) {
            console.error('An unexpected error happened occurred:', error)

        }
    }
    const handleSignup = async () => {

        const newuser = await Signup(control._formValues.username, control._formValues.password)

        if (newuser) {
            const calendar = await createNewCalendar(newuser.done.insertId)

            toast.show('Your user was created successfully. Now log in.', {
                type: "success",
                placement: "bottom",
                duration: 4000,
                animationType: "slide-in",
            })
            setShowSignUp(!showSignUp)
        }

    }

    const handlePress = isSignup ? handleSignup : handleLogin
    const title = isSignup ? 'Sign Up' : 'Login'
    const subheading = isSignup ? 'Join our vip group and get exclusive deals and discounts' : 'Log back in and continue enjoying exclusive deals and discounts'
    const signInOption = isSignup ? 'Already a member ? Log back in by pressing here' : 'Don`t have an account yet ? Sign up and enjoy exclusive deals and membership perks by pressing here.'
    const buttonTitle = isSignup ? 'Sign up' : 'Login'


    return (
        <>
            <SafeAreaView>
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
            </SafeAreaView>
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
