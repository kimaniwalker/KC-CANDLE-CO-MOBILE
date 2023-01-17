import React from 'react'
import { Modal } from 'react-native'
import styled from 'styled-components/native'
import { Colors } from '../../styles/Colors'
import { Fonts } from '../../styles/Fonts'
import StyledButton from '../../styles/StyledButton'
import { MaterialIcons } from '@expo/vector-icons';
import { UserContext, useUserContext } from '../../context/user'
import { deleteUser, removeItem } from '../../lib/UseAuthHooks'
import { useNavigation } from '@react-navigation/native'

type Props = {
    showModal: boolean
    setShowModal: (showModal: boolean) => void
}

export default function AccountDeletion({ showModal, setShowModal }: Props) {

    const { user, setUser, setLoggedIn } = useUserContext()
    const navigation: any = useNavigation()

    const deleteAccount = async () => {
        const res = await deleteUser(user.id)
        setUser({
            id: "",
            username: "",
            phone: "",
            address: "",
            customer_id: "",
            role: "",
        })
        setLoggedIn(false)
        removeItem('user')
        removeItem('authToken')
        navigation.navigate('Home')
    }

    return (
        <>
            <Wrapper>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showModal}
                >
                    <Content>
                        <IconWrapper>
                            <Button onPress={() => setShowModal(false)}>
                                <CloseIcon name="clear" size={32} color="white" />
                            </Button>
                        </IconWrapper>
                        <Title>Are you sure you want to delete your account ? </Title>
                        <SubTitle>We would hate to see you leave. This action is not reversible. Make sure that you cancel any ongoing subscriptions before continuing.</SubTitle>
                        <StyledButton buttonTitle='Delete' onPress={deleteAccount} disabled={false} />

                    </Content>

                </Modal>
            </Wrapper>
        </>
    )
}

const Wrapper = styled.View`
    flex: 1;
`
const Content = styled.View`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
    position: relative;
`
const Title = styled.Text`
    font-family: ${Fonts.bold};
    font-size: 24px;
    text-align: center;
    
`
const SubTitle = styled.Text`
    font-family: ${Fonts.medium};
    font-size: 18px;
    text-align: center;
    margin-top: 8px;
`
const IconWrapper = styled.View` 
   position: absolute;
   top: 40px;
   right: 30px;
`
const Button = styled.Pressable`
    border-radius: 50%;
    background-color: ${Colors.dark};
    padding: 8px;
`
const CloseIcon = styled(MaterialIcons)`
    
`