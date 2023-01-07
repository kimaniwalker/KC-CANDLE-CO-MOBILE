import React, { useState, createContext, SetStateAction } from "react";
import { checkIfUserExist, getCustomerInfo, getUserInfo } from "../lib/UseAuthHooks";
import { UserInfo } from '../lib/types'

interface UserProviderProps {
    children: React.ReactNode
}




export const UserContext = createContext({
    loggedIn: false,
    setLoggedIn: (loggedIn: boolean) => { },
    user: {
        id: '',
        username: '',
        phone: '',
        address: '',
        customer_id: '',
        role: '',

    },
    setUser: (user: UserInfo) => { },
    getUser: () => { },
    customer: {}
});

export const UserWrapper = ({ children }: UserProviderProps) => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState<UserInfo>({
        id: '',
        username: '',
        phone: '',
        address: '',
        customer_id: '',
        role: '',
    })
    const [customer, setCustomer] = useState<any>({})



    React.useEffect(() => {

        //getPrevSession()
        findCustomerInfo()
    }, [])

    React.useEffect(() => {

        findCustomerInfo()
    }, [user])



    const getPrevSession = async () => {
        let session = await checkIfUserExist('user')
        if (session) {

            setUser(session)
            setLoggedIn(true)
        }

    }

    const getUser = async () => {
        const myuser = await getUserInfo(user.username)

        if (myuser) {
            setUser(myuser)
        }
    }

    const findCustomerInfo = async () => {
        if (user.customer_id) {
            const customer = await getCustomerInfo(user.customer_id)
            if (customer) {
                setCustomer(customer)
            }
        }
    }


    return (
        <UserContext.Provider value={{ loggedIn, setLoggedIn, user, setUser, getUser, customer }}>
            {children}
        </UserContext.Provider>
    );
};

export function useUserContext() {
    return React.useContext(UserContext)
}