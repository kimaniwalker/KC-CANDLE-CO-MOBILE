import React from 'react'
import styled from 'styled-components/native'
import { ScrollView } from 'react-native'
import { Fonts } from '../../styles/Fonts'

export default function Terms() {


    return (
        <>
            <ScrollView>

                <Wrapper>
                    <Content>

                        <Heading>Terms & Conditions</Heading>
                        <Description><Bold>Memberships:</Bold> Memberships are open to join at any time and can only be done on the KCCANDLECO website or mobile app. Before you purchase your membership please read the rules of the Memberships as breaking them will result in loss of membership. If you are a member and break any of the rules you will lose your membership. Memberships are available in monthly increments or yearly. </Description>
                        <Description><Bold>What to expect:</Bold> After signing up successfully for a subscription package you will be charged on a monthly basis UNLESS you pay up front by signing up for the full year.  For monthly plans , you will be charged on the same day each month. Ex. If you sign up on Jan 15th , you will be charged again on Feb 15th. You will be able to see all of this information under the accounts tab by selecting subscription details. In the accounts tab , you will notice a section labled upcoming schedule. Here you will be able to see your upcoming candle for each month. If you have one that is your favorite or would like to try a new one , you can edit the calendar here and make a selection. In order to accomodate any last minute updates, changes need to be saved by the first of the month. All orders will began processing at the first of each month. </Description>
                        <Description><Bold>Cancellation Policy:</Bold> You can cancel a subscription at any time. This can be done via the accounts tab under subscription details. The cancellation will take place immediatly and you will be mailed any items that you are owed for the current billing period. For yearly subscriptions , your account will remain active throughtout the length of the year and you will not be auto enrolled for the next year. This means that you will still receive your monthly packages until the term is over. </Description>
                        <Description><Bold>Trust the process:</Bold> Each package will be mailed out by the 5th of each month and you will be emailed with your tracking information once processed. If you start your subscription after the 5th of the month , you will receive two candles in your first package. Updates are done via KCCANDLECO instagram page @kustomcharmz. If you do not see an update then there isn't one! We provide updates as they are available and will be transparent with any delays and notify customers when products have movement. </Description>
                        <Description><Bold>Shipping:</Bold> Each package will be shipped from our local post office and could be subject delays. If you encounter any issues, please reach out to us via our email <Bold>admin@kustomcharmz.com</Bold> and we will respond within 48 hours. If you receive any broken packages , please send us an email with a picture of the items and we will replace them asap.</Description>
                    </Content>
                </Wrapper>
            </ScrollView>

        </>
    )
}

const Wrapper = styled.View`
    margin: 16px 0 32px 0;
    padding: 16px;
display: flex;
justify-content: center;
align-content: center;
`
const Content = styled.View`
    
`
const Heading = styled.Text`
    font-size: 32px;
    text-align: center;
    font-family: ${Fonts.bold};
    margin: 24px 0 44px 0;
`
const Description = styled.Text`
    font-size: 16px;
    font-family: ${Fonts.medium};
    margin-bottom: 16px;
`
const Bold = styled.Text`
    font-weight: 800;
    font-family: ${Fonts.bold};
`

