import React from 'react'
import styled from 'styled-components/native'
import { Text, View, TextInput, Button, Alert, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import StyledButton from '../../styles/StyledButton';
import Header from '../home/Header';
import { UserContext, useUserContext } from '../../context/user';
import { updateUser } from '../../lib/user';
import { storeUser } from '../../lib/UseAuthHooks';
import { UserInfo } from '../../lib/types';
import { useToast } from 'react-native-toast-notifications';
import { Fonts } from '../../styles/Fonts';
import { Colors } from '../../styles/Colors';

type Props = {
    line1: string
    line2?: string
    postal_code: string | number
    state: string
    country: string
    phone: string | number,
    city: string
}
export default function CollectShippingInfo() {

    const { user, setUser } = useUserContext()
    const address = user?.address?.split("-")

    const toast = useToast()

    const defaultObject = {
        line1: address && (address[0]),
        line2: address && (address[1]),
        city: address && (address[2]),
        state: address && (address[3]),
        postal_code: address && (address[4]),
        country: address && (address[5]),
        phone: user.phone,
    }
    const staticObject = {
        line1: '',
        line2: '',
        city: '',
        state: '',
        postal_code: '',
        country: '',
        phone: user.phone,
    }

    const values = user.address ? defaultObject : staticObject

    const [defaultValues, setDefault] = React.useState(values)


    const { control, handleSubmit, trigger, formState: { errors, isValid }, setError } = useForm({
        defaultValues,
        mode: 'onChange'
    });

    React.useEffect(() => {
        trigger()
    }, [trigger])

    const onSubmit = async () => {

        const address: any = control._formValues
        const userUpdated = await updateUser({
            user: {
                id: user.id,
                address: `${address.line1}-${address.line2}-${address.city}-${address.state}-${address.postal_code}-${address.country}`,
                phone: address.phone,
                username: user.username,
                customer_id: user.customer_id,
                role: user.role
            }

        })

        if (userUpdated) {
            setUser({
                id: user.id,
                username: user.username,
                phone: address.phone,
                address: `${address.line1}-${address.line2}-${address.city}-${address.state}-${address.postal_code}-${address.country}`,
                role: user.role,
                customer_id: user.customer_id

            })
            storeUser({
                value: {
                    id: user.id,
                    username: user.username,
                    phone: address.phone,
                    address: `${address.line1}-${address.line2}-${address.city}-${address.state}-${address.postal_code}-${address.country}`,
                    role: user.role,
                    customer_id: user.customer_id
                }, key: 'user'
            })

            toast.show('Your info was saved succesfuly', {
                type: "success",
                placement: "bottom",
                duration: 4000,
                animationType: "slide-in",
            })


        }
    };


    if (!defaultValues) return null
    return (
        <>
            <Header />
            <ScrollView>

                <Wrapper>

                    <Heading>Add your contact Info</Heading>
                    <SubHeading>We need this information in order to send your packages to the correct address</SubHeading>
                    <Content>
                        <Label>Line1</Label>
                        {errors.line1 && <ErrMessage>{errors.line1?.message}</ErrMessage>}
                        <Controller
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: 'This is a required field'
                                },
                            }}
                            render={({ field: { onChange, onBlur, value },
                                fieldState: { error } }) => (
                                <Input
                                    isDirty={error ? true : false}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    defaultValue={defaultValues.line1}
                                    placeholder={defaultValues.line1}

                                />
                            )}
                            name="line1"
                        />
                        <Label>Line2</Label>
                        <Controller
                            control={control}
                            rules={{
                                maxLength: 100,
                            }}
                            render={({ field: { onChange, onBlur, value, } }) => (
                                <Input
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    defaultValue={defaultValues.line2}
                                    placeholder={defaultValues.line2}
                                    value={value}
                                />
                            )}
                            name="line2"
                        />
                        <Label>Postal Code</Label>
                        {errors.postal_code && <ErrMessage>{errors.postal_code?.message}</ErrMessage>}
                        <Controller
                            control={control}
                            rules={{
                                required: {
                                    message: 'This is a required field',
                                    value: true
                                },
                                maxLength: {
                                    value: 5,
                                    message: 'Invalid zip code'
                                },
                                minLength: {
                                    value: 5,
                                    message: 'Invalid zip code'
                                },
                                pattern: {
                                    value: /^\d+$/,
                                    message: 'Must consist of numbers only'
                                }

                            }}
                            render={({ field: { onChange, onBlur, value },
                                fieldState: { error } }) => (
                                <Input
                                    isDirty={error ? true : false}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    defaultValue={defaultValues.postal_code}
                                    placeholder={defaultValues.postal_code}
                                    value={value}
                                />
                            )}
                            name="postal_code"
                        />
                        <Label>City</Label>
                        {errors.city && <ErrMessage>{errors.city?.message}</ErrMessage>}
                        <Controller
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: 'This is a required field'
                                },
                            }}
                            render={({ field: { onChange, onBlur, value },
                                fieldState: { error } }) => (
                                <Input
                                    isDirty={error ? true : false}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    defaultValue={defaultValues.city}
                                    placeholder={defaultValues.city}
                                    value={value}
                                />
                            )}
                            name="city"
                        />
                        <Label>State</Label>
                        {errors.state && <ErrMessage>{errors.state?.message}</ErrMessage>}
                        <Controller
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: 'This is a required field'
                                },
                            }}
                            render={({ field: { onChange, onBlur, value },
                                fieldState: { error } }) => (
                                <Input
                                    isDirty={error ? true : false}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    defaultValue={defaultValues.state}
                                    placeholder={defaultValues.state}
                                    value={value}
                                />
                            )}
                            name="state"
                        />
                        <Label>Country</Label>
                        {errors.country && <ErrMessage>{errors.country?.message}</ErrMessage>}
                        <Controller
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: 'This is a required field'
                                },
                            }}
                            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                                <Input
                                    isDirty={error ? true : false}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    defaultValue={defaultValues.country}
                                    placeholder={defaultValues.country}
                                    value={value}
                                />
                            )}
                            name="country"
                        />
                        <Label>Phone</Label>
                        {errors.phone && <ErrMessage>{errors.phone?.message}</ErrMessage>}
                        <Controller
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: 'This is a required field'
                                },
                            }}
                            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                                <Input
                                    isDirty={error ? true : false}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    defaultValue={defaultValues.phone}
                                    placeholder={defaultValues.phone}
                                    value={value}
                                />
                            )}
                            name="phone"

                        />

                        <StyledButton buttonTitle="Submit" disabled={!isValid} onPress={handleSubmit(onSubmit)} />
                    </Content>
                </Wrapper>
            </ScrollView>
        </>
    )
}

const Wrapper = styled.View`
    padding: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
`
const Input = styled.TextInput<{ isDirty?: boolean }>`  
    width: 100%;
    height: 50px;
    margin: 10px;
    border: 2px solid black;
    border-color: ${props => props.isDirty ? Colors.error : Colors.dark};
    border-radius: 8px;
    font-family: ${Fonts.medium};
    padding: 0 16px;
    align-self: center;
`
const Content = styled.View`
    width: 100%;
    align-items: center;
`
const Label = styled.Text`
        font-family: ${Fonts.medium};
        font-size: 18px;
        align-self: flex-start;
`
const Heading = styled.Text`
font-family: ${Fonts.bold};
        font-size: 32px;
        align-self: flex-start;
        margin-bottom: 8px;
`
const SubHeading = styled.Text`
     font-family: ${Fonts.medium};
        font-size: 18px;
        margin-bottom: 24px;
        align-self: flex-start;
`

const ErrMessage = styled.Text`
     font-family: ${Fonts.medium};
        font-size: 16px;
        align-self: flex-start;
        color: ${Colors.error};
        padding-top: 4px;
`

