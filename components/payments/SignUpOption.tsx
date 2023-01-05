import React from 'react'
import { View, Text, Button } from 'react-native'

type Props = {
    handlePress: () => void
    errMessage: string
}

export default function SignUpOption({ handlePress, errMessage }: Props) {



    return (
        <>
            <View>
                <Text>Testing</Text>
                <Text>20$</Text>

                {errMessage && (
                    <Text>{errMessage}</Text>
                )}
                <Button title='Submit' onPress={handlePress} />

            </View>
        </>
    )
}
