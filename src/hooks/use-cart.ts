import { useCartContext } from "@/components/cart-provider"

interface CartItem {
    id: number
    name: string
    price: number
    quantity: number
    image: string
}

export function useCart() {
    const { state, dispatch } = useCartContext()

    const addItem = (item: CartItem) => {
        dispatch({ type: "ADD_ITEM", payload: item })
    }

    const removeItem = (id: number) => {
        dispatch({ type: "REMOVE_ITEM", payload: id })
    }

    const updateQuantity = (id: number, quantity: number) => {
        if (quantity <= 0) {
            removeItem(id)
        } else {
            dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
        }
    }

    const clearCart = () => {
        dispatch({ type: "CLEAR_CART" })
    }

    const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return {
        items: state.items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
    }
}
