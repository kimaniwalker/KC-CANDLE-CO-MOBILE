import React, { ReactNode } from 'react'
import styled from 'styled-components/native'
import { Fonts } from '../../styles/Fonts'



type Props = {
    title: string
    icon: ReactNode
    description: string
    bgcolor: string
}
export default function CollectionsItem({ title, icon, description, bgcolor }: Props) {


    return (
        <>




            <Card color={bgcolor}>

                <Icon>{icon}</Icon>



                <Title>{title}</Title>
                <Description>{description}</Description>



            </Card>


        </>
    )
}

const Card = styled.View<{ color: string }>`
    max-width: 327px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.color || 'lightgray'};
    border-radius: 40px;
    color: black;
    margin: 5px 20px;
    padding: 50px 50px;


`
const Icon = styled.View`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Title = styled.Text`
      font-family: ${Fonts.medium};
      font-size: 32px;
      text-align: center;
      margin-bottom: 16px;
`
const Description = styled.Text`
    font-family: ${Fonts.medium};
    text-align: center;
    font-size: 18px;
`



