import React from 'react'
import styled from 'styled-components/native'
import CollectionsItem from './CollectionItem';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fonts } from '../../styles/Fonts';


export default function Collections() {


    return (
        <>
            <Row>

                <TitleDiv>
                    <Title>A candle is much more than a fragrant piece of decor. A candle is many things  — an olfactory object of expression, a time-machine, a therapeutic tool. </Title>
                </TitleDiv>




                <CollectionsItem bgcolor={'pink'} title={'Create Ambiance'} description={'Candles transform an atmosphere through scent, changing the way we feel in space. Lighting a candle for meditation, a bath, a date or any other intention is a beloved practice for setting an ambiance anywhere. '} icon={<MaterialCommunityIcons name="candle" size={66} color="black" />} />

                <CollectionsItem bgcolor={'#cc6bd6'} title={'Calm the mind'} description={'Floral and herbal aromas, like geranium, lavender, and peppermint, have been proven to be useful for the treatment of various psychological and physiological disorders through the burning of aromatherapeutic candles. Candles for depression and anxiety are particularly popular. '} icon={<MaterialCommunityIcons name="brain" size={66} color="black" />} />

                <CollectionsItem bgcolor={'pink'} title={'Improved moods'} description={'Scented candles can induce calm and help to alleviate symptoms of stress, with the ability to lower cortisol. Certain candles are crafted specifically to activate chemicals in the brain, like serotonin and dopamine, to support a positive mood.'} icon={<MaterialCommunityIcons name="robot-happy-outline" size={66} color="black" />} />


            </Row>
        </>
    )
}

const Row = styled.View`
width: 100%;
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: center;
text-align: center;
`

const Title = styled.Text`
font-size: 40px;
max-width: 75%;
text-align: center;
font-family: ${Fonts.bold};
`

const TitleDiv = styled.View`
    width: 100%;
    text-align: center;
    justify-content: center;
    display: flex; 
    flex-direction: row;
    margin: 24px 0;
`
