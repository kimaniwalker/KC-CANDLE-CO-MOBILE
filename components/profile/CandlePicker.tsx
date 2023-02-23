import React, { useState } from 'react'
import styled from 'styled-components/native'
import { useUserContext } from '../../context/user'
import DropDownPicker from 'react-native-dropdown-picker';
import { Alert, ImageBackground, ScrollView, View } from 'react-native';
import StyledButton from '../../styles/StyledButton';
import { Colors } from '../../styles/Colors';
import { Entypo } from '@expo/vector-icons';
import { Fonts } from '../../styles/Fonts';
import Constants from 'expo-constants';
import { Scents } from '../../data/Scents';
import { getUserCalendar, updateCalendar } from '../../lib/useCalendarHooks';



type Props = {
    id: string
}


export default function CandlePicker({ id }: Props) {
    const ENV = "production"
    const URL: string = ENV === 'production' ? Constants.expoConfig?.extra?.PRODUCTION_API_URL : Constants.expoConfig?.extra?.STAGING_API_URL

    const { user } = useUserContext()
    const [calendar, setCalendar] = useState<any>([])
    const [toggleEdit, setToggleEdit] = useState(false)
    const [january, setJanuary] = useState('')
    const [febuary, setFebuary] = useState('')
    const [march, setMarch] = useState('')
    const [april, setApril] = useState('')
    const [may, setMay] = useState('')
    const [june, setJune] = useState('')
    const [july, setJuly] = useState('')
    const [august, setAugust] = useState('')
    const [september, setSeptember] = useState('')
    const [october, setOctober] = useState('')
    const [november, setNovember] = useState('')
    const [december, setDecember] = useState('')
    const [open, setOpen] = useState(false);
    const [key, setKey] = useState(0)



    const Data = [
        {
            month: 'january',
            setter: setJanuary,
            value: january,
            image: require('../../assets/calendar/Jan.png')
        },
        {
            month: 'febuary',
            setter: setFebuary,
            value: febuary,
            image: require('../../assets/calendar/Feb.png')
        },
        {
            month: 'march',
            setter: setMarch,
            value: march,
            image: require('../../assets/calendar/Mar.png')
        },
        {
            month: 'april',
            setter: setApril,
            value: april,
            image: require('../../assets/calendar/Apr.png')
        },
        {
            month: 'may',
            setter: setMay,
            value: may,
            image: require('../../assets/calendar/May.png')
        },
        {
            month: 'june',
            setter: setJune,
            value: june,
            image: require('../../assets/calendar/July.png')
        },
        {
            month: 'july',
            setter: setJuly,
            value: july,
            image: require('../../assets/calendar/June.png')
        },
        {
            month: 'august',
            setter: setAugust,
            value: august,
            image: require('../../assets/calendar/Aug.png')
        },
        {
            month: 'september',
            setter: setSeptember,
            value: september,
            image: require('../../assets/calendar/September.png')
        },
        {
            month: 'october',
            setter: setOctober,
            value: october,
            image: require('../../assets/calendar/Oct.png')
        },
        {
            month: 'november',
            setter: setNovember,
            value: november,
            image: require('../../assets/calendar/Nov.png')
        },
        {
            month: 'december',
            setter: setDecember,
            value: december,
            image: require('../../assets/calendar/Dec.png')
        },
    ]

    const updateCalendarContent = async () => {

        const body = {
            userid: id,
            january: january,
            febuary: febuary,
            march: march,
            april: april,
            may: may,
            june: june,
            july: july,
            august: august,
            september: september,
            october: october,
            november: november,
            december: december,
            last_modified: new Date().toISOString().slice(0, 19)
        }

        try {

            const updateComplete = await updateCalendar(body)

            if (!updateComplete) {
                setToggleEdit(!toggleEdit)
                Alert.alert(
                    "Success",
                    "Your calendar has been updated.",
                    [
                        {
                            text: "OK", onPress: () => {
                                setKey(key + 1)
                            }
                        }
                    ]
                );
            }


        } catch (error: any) {
            console.error('An unexpected error happened occurred:', error)
            Alert.alert(error.message)

        }
    }


    const getCalendar = async () => {
        try {
            const data = await getUserCalendar(id)

            if (data) {
                setCalendar(data[0])
                setJanuary(data[0].january)
                setFebuary(data[0].febuary)
                setMarch(data[0].march)
                setApril(data[0].april)
                setMay(data[0].may)
                setJune(data[0].june)
                setJuly(data[0].july)
                setAugust(data[0].august)
                setSeptember(data[0].september)
                setOctober(data[0].october)
                setNovember(data[0].november)
                setDecember(data[0].december)
            }

        } catch (error) {
            console.error('An unexpected error happened occurred:', error)

        }
    }

    const onButtonClick = () => {
        toggleEdit ? updateCalendarContent() : setToggleEdit(!toggleEdit)
    }


    React.useEffect(() => {
        getCalendar()
    }, [])

    React.useEffect(() => {
        getCalendar()
    }, [key])


    return (
        <>


            <Wrapper>
                <IconWrapper onPress={onButtonClick}>
                    {toggleEdit ? <Entypo name="save" size={32} color="white" />
                        : <Entypo name="edit" size={32} color="white" />
                    }


                </IconWrapper>
                <ScrollView showsVerticalScrollIndicator={false}>

                    {Data.map(item => (
                        <Card key={item.month}>

                            <ImageBackground source={item.image} style={{ flex: 1 }}>
                                <CardContainer>

                                    <Month>{item.month.toUpperCase()}</Month>
                                    <Scent>{calendar[item.month]}</Scent>

                                    {toggleEdit && (
                                        <DropDownPicker
                                            open={open}
                                            value={item.value}
                                            items={Scents}
                                            setOpen={setOpen}
                                            setValue={item.setter}
                                            listMode="SCROLLVIEW"
                                            scrollViewProps={{
                                                horizontal: true
                                            }}

                                        />
                                    )}

                                </CardContainer>
                            </ImageBackground>

                        </Card>
                    ))}

                    <StyledButton disabled={false} buttonTitle={toggleEdit ? 'save' : 'edit'} onPress={onButtonClick}></StyledButton>


                </ScrollView>
            </Wrapper>

        </>
    )
}




const Card = styled.View`
    width: 350px;
    height: 350px;
    margin-top: 16px;
    margin-bottom: 16px;
    border: 2px solid gray;
    border-radius: 8px;
    box-shadow: 5px 2.5px 2.5px ${Colors.dark};
`
const Wrapper = styled.View`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    align-items: center;
    position: relative;
    flex: 1;
    margin-bottom: 24px;
`


const Month = styled.Text`
    font-size: 36px;
    text-align: center;
    font-family: ${Fonts.thin};
`
const Scent = styled.Text`
    font-size: 24px;
    margin: 16px 0;
    text-align: center;
    font-family: ${Fonts.medium};
`
const CardContainer = styled.View`
    display: flex;
    width: 100%;
    height: 100%;
    padding: 32px;
    justify-content: center;
    align-items: center;
    align-content: center;
    justify-items: center;

`
const IconWrapper = styled.Pressable`
    background-color: ${Colors.dark};
    border-radius: 50%;
    padding: 16px;
    position: absolute;
    top: 20px;
    right: 10px;
    z-index: 99;
`
