import React from 'react'
import { FlatList, ScrollView } from 'react-native'
import { Products } from '../../data/Products'
import ProductThumbnail from './ProductThumbnail'



export default function AllProducts() {

    const AllProducts = Products.filter((item) => item.isAvailable === true)

    return (
        <>

            <FlatList data={AllProducts} initialNumToRender={3} renderItem={({ item }) => (
                <ProductThumbnail key={item.id} {...item} />
            )} />




        </>
    )
}
