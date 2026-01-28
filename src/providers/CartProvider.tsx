import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react'
import {
  getCart,
  addToCart as addToCartFn,
  updateCartItemQuantity as updateQuantityFn,
  removeFromCart as removeFromCartFn,
  setSelectedPlan as setSelectedPlanFn,
  clearCart as clearCartFn,
  getCartTotals,
  type Cart,
  type CartItem,
  type MenuItem,
} from '../lib/cart'

interface CartContextValue {
  cart: Cart
  itemCount: number
  subtotal: number
  discount: number
  total: number
  addToCart: (menuItem: MenuItem, quantity?: number) => void
  updateQuantity: (menuItemId: string, quantity: number) => void
  removeFromCart: (menuItemId: string) => void
  setSelectedPlan: (plan: { name: string; price: number; meals: number }) => void
  clearCart: () => void
  getItem: (menuItemId: string) => CartItem | undefined
}

const CartContext = createContext<CartContextValue | null>(null)

export function useCart(): CartContextValue {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

interface CartProviderProps {
  children: ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<Cart>({ items: [] })

  // Load cart from localStorage on mount
  useEffect(() => {
    setCart(getCart())
  }, [])

  const addToCart = useCallback((menuItem: MenuItem, quantity: number = 1) => {
    const newCart = addToCartFn(menuItem, quantity)
    setCart({ ...newCart })
  }, [])

  const updateQuantity = useCallback((menuItemId: string, quantity: number) => {
    const newCart = updateQuantityFn(menuItemId, quantity)
    setCart({ ...newCart })
  }, [])

  const removeFromCart = useCallback((menuItemId: string) => {
    const newCart = removeFromCartFn(menuItemId)
    setCart({ ...newCart })
  }, [])

  const setSelectedPlan = useCallback(
    (plan: { name: string; price: number; meals: number }) => {
      const newCart = setSelectedPlanFn(plan)
      setCart({ ...newCart })
    },
    []
  )

  const clearCart = useCallback(() => {
    clearCartFn()
    setCart({ items: [] })
  }, [])

  const getItem = useCallback(
    (menuItemId: string): CartItem | undefined => {
      return cart.items.find((item) => item.menuItem.id === menuItemId)
    },
    [cart.items]
  )

  const totals = getCartTotals(cart)

  const value: CartContextValue = {
    cart,
    itemCount: totals.itemCount,
    subtotal: totals.subtotal,
    discount: totals.discount,
    total: totals.total,
    addToCart,
    updateQuantity,
    removeFromCart,
    setSelectedPlan,
    clearCart,
    getItem,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
