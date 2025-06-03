import { useCartContext } from "@/components/cart-provider"

interface CartItem {
    id: number
    nombre: string
    precio: number
    cantidad: number
    imagen: string
}

export function useCart() {
    const { state, dispatch } = useCartContext()

    const addItem = (item: CartItem) => {
        dispatch({ type: "ADD_ITEM", payload: item })
    }

    const removeItem = (id: number) => {
        dispatch({ type: "REMOVE_ITEM", payload: id })
    }

    const updateQuantity = (id: number, cantidad: number) => {
        if (cantidad <= 0) {
            removeItem(id)
        } else {
            dispatch({ type: "UPDATE_QUANTITY", payload: { id, cantidad } })
        }
    }

    const clearCart = () => {
        dispatch({ type: "CLEAR_CART" })
    }

    // Calcular total de forma segura
    const total = (state?.items || []).reduce((sum, item) => {
        const itemPrice = item?.precio || 0
        const itemQuantity = item?.cantidad || 0
        return sum + itemPrice * itemQuantity
    }, 0)

    return {
        items: state?.items || [],
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
    }
}
