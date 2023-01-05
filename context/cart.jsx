import { createContext, useContext, useState, useEffect } from 'react';
import { storeCart } from '../lib/cart';
import { checkIfUserExist } from '../lib/UseAuthHooks';
import { useToast } from "react-native-toast-notifications";
import { UserContext, useUserContext } from './user';



const CartContext = createContext();
CartContext.displayName = 'CartContext'

export function CartWrapper({ children }) {

    const [cart, setCart] = useState([])
    const [metadata, setMetadata] = useState([])
    const [appleParams, setAppleParams] = useState([])
    const toast = useToast();
    const { user } = useUserContext()



    useEffect(() => {
        getCartItems()
    }, [])

    useEffect(() => {
        storeCart(cart, 'cart')
        generateMetadata()
    }, ['cart', cart])



    function addToCart(product) {

        setCart((prev) => {
            const existing = cart.find((item) => item.id === product.id && item.size === product.size);

            return existing
                ? [...cart.map((item) => item.id === product.id && product.size === item.size
                    ? { ...item, qty: item.qty + 1 }
                    : item,
                ),
                ]
                : [...prev, { ...product, qty: 1 }]

        })

        toast.show('Your item was added to the cart successfully', {
            type: "success",
            placement: "bottom",
            duration: 4000,
            offset: 30,
            animationType: "slide-in",
        })


    }

    function changeQty(id, qty, size) {

        if (qty === 0) return removeCartItem(id)

        setCart((prev) => [
            ...prev.map((item) => item.id === id && item.size === size ? { ...item, qty } : item,)
        ])


        return null
    }

    async function getCartItems() {
        const data = await checkIfUserExist('cart')
        if (data) {

            setCart(data)
        } else {
            setCart([])
            return []
        }
    }

    function clearCartItems() {
        setCart([])
        return cart;
    }

    function removeCartItem(id) {

        const result = cart.filter(cartItem => cartItem.id !== id)
        setCart(result)
        return result

    }

    function generateMetadata() {
        let items = {}
        let applePayParams = []

        items["Shipping Address"] = user?.address
        cart?.map((item) => {
            items["orderid-" + Math.floor(Math.random() * 90) + 10] = `${item.title} - size:${item.size} - qty:${item.qty} - price: ${item.price}`



            applePayParams.push({ paymentType: "Immediate", label: item.title, amount: toString(item.price) })
        })

        setMetadata(items)
        setAppleParams(applePayParams)

    }

    return (
        <CartContext.Provider value={{ cart, setCart, addToCart, changeQty, clearCartItems, removeCartItem, getCartItems, metadata, appleParams }} >
            {children}
        </CartContext.Provider>
    );
}

export function useCartContext() {
    return useContext(CartContext);
}