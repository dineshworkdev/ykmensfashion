import { createContext, useContext, useReducer } from 'react'

const CartContext = createContext(null)

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const key = `${action.item.id}-${action.item.selectedSize}-${action.item.selectedColor}`
      const existing = state.find((i) => i.key === key)
      if (existing) {
        return state.map((i) =>
          i.key === key ? { ...i, qty: i.qty + 1 } : i
        )
      }
      return [...state, { ...action.item, key, qty: 1 }]
    }
    case 'REMOVE':
      return state.filter((i) => i.key !== action.key)
    case 'INCREMENT':
      return state.map((i) =>
        i.key === action.key ? { ...i, qty: i.qty + 1 } : i
      )
    case 'DECREMENT':
      return state
        .map((i) => (i.key === action.key ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    case 'CLEAR':
      return []
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(reducer, [])

  const addToCart   = (item) => dispatch({ type: 'ADD', item })
  const removeItem  = (key)  => dispatch({ type: 'REMOVE', key })
  const increment   = (key)  => dispatch({ type: 'INCREMENT', key })
  const decrement   = (key)  => dispatch({ type: 'DECREMENT', key })
  const clearCart   = ()     => dispatch({ type: 'CLEAR' })

  const totalQty    = cart.reduce((s, i) => s + i.qty, 0)
  const totalPrice  = cart.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeItem, increment, decrement, clearCart, totalQty, totalPrice }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
