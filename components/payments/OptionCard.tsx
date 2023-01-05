import React, { ReactNode } from 'react'
import styled from 'styled-components/native';
import { Colors } from '../../styles/Colors';
import { Fonts } from '../../styles/Fonts';
import StyledButton from '../../styles/StyledButton';


type Props = {
  buttonTitle: string
  onPress: () => void
  title: string
  subheading: string
  price: string
  duration: string
  disabled: boolean
  children?: ReactNode
}

export default function OptionCard({ buttonTitle, onPress, title, subheading, price, duration, disabled, children }: Props) {


  return (
    <>
      <Wrapper>
        <Content>

          <Title>{title}</Title>
          <Price>{price}</Price><Term>{duration}</Term>
          <Subheading>{subheading}</Subheading>
          {children}
          <StyledButton buttonTitle={buttonTitle} onPress={onPress} disabled={disabled} />

        </Content>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.View`
display: flex;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  margin: 16px 0;
  width: 100%;

`;
const Title = styled.Text`
  text-align: center;
  font-size: 50px;
 
  font-family: ${Fonts.bold};
    
`;
const Price = styled.Text`
  color: #000;
  text-align: center;
  font-size: 50px;
   font-family: ${Fonts.thin};
align-self: center;   
`;

const Subheading = styled.Text`
  color: #000;
text-align: center;
font-size: 24px; 
font-family: ${Fonts.medium};
margin-bottom: 8px;
color: ${Colors.blueGreen};
`
const Content = styled.View`
   
    width: 350px;
    background-color: ${Colors.white};
    height: 450px;
    display: flex;
    justify-content: center;
    align-items: center;
  padding: 32px;
    border-radius: 8px;
    box-shadow: 7px 5px 5px lightgray;
 
`
const Term = styled.Text`
   color: #000;
  font-size: 16px; 
  margin-bottom: 20px;
  font-family: ${Fonts.medium};
 
`
