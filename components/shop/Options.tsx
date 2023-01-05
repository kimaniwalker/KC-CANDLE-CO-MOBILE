import React from 'react'
import DropDownPicker from 'react-native-dropdown-picker';

type Props = {
    available_sizes: string[]
    selectedSize: string
    setSelectedSize: (size: any) => void
}

export default function Options({ available_sizes, selectedSize, setSelectedSize }: Props) {

    const [open, setOpen] = React.useState(false)
    const [items, setItems] = React.useState<any>([])

    const createItems = () => {
        let sizes: any = []

        available_sizes.forEach((item) => {
            sizes.push({ label: item, value: item })
        })
        setItems(sizes)
    }

    React.useEffect(() => {
        createItems()

    }, [])
    React.useEffect(() => {
        createItems()
    }, [open])

    return (

        <DropDownPicker
            open={open}
            value={selectedSize}
            items={items}
            itemKey={items.label}
            setOpen={setOpen}
            setValue={setSelectedSize}
            setItems={setItems}
            listMode="SCROLLVIEW"
            placeholder='Select a size'

        />

    )
}
