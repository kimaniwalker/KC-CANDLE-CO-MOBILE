import React from 'react'
import styled from 'styled-components/native'
import { Fonts } from '../../styles/Fonts'

export default function MembershipPerks() {

    const Perks = ['Monthly Featured Candles', 'Free Shipping', 'Exclusive Deals', 'Yearly Suprises',]

    return (
        <>
            <Wrapper>
                {Perks.map((item, index) => (
                    <Perk key={index}> - {item}</Perk>
                ))}
            </Wrapper>
        </>
    )
}
const Wrapper = styled.View`
    display: flex;
`
const Perk = styled.Text`
       font-family: ${Fonts.thin};
       font-size: 18px;
       margin: 4px 0 ;
`
