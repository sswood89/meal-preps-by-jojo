const CRM_API_URL = import.meta.env.VITE_CRM_API_URL || 'http://localhost:3000'
const CART_KEY = 'jojo_cart'

export interface MenuItem {
  id: string
  name: string
  description: string | null
  category: string
  price: number
  dietaryTags: string[]
  imageUrl: string | null
}

export interface CartItem {
  menuItem: MenuItem
  quantity: number
  notes?: string
}

export interface Cart {
  items: CartItem[]
  selectedPlan?: {
    name: string
    price: number
    meals: number
  }
}

// Get cart from localStorage
export function getCart(): Cart {
  if (typeof window === 'undefined') return { items: [] }

  const stored = localStorage.getItem(CART_KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return { items: [] }
    }
  }
  return { items: [] }
}

// Save cart to localStorage
export function saveCart(cart: Cart): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
  }
}

// Clear cart
export function clearCart(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(CART_KEY)
  }
}

// Add item to cart
export function addToCart(menuItem: MenuItem, quantity: number = 1): Cart {
  const cart = getCart()
  const existingIndex = cart.items.findIndex((item) => item.menuItem.id === menuItem.id)

  if (existingIndex >= 0) {
    cart.items[existingIndex].quantity += quantity
  } else {
    cart.items.push({ menuItem, quantity })
  }

  saveCart(cart)
  return cart
}

// Update item quantity
export function updateCartItemQuantity(menuItemId: string, quantity: number): Cart {
  const cart = getCart()
  const index = cart.items.findIndex((item) => item.menuItem.id === menuItemId)

  if (index >= 0) {
    if (quantity <= 0) {
      cart.items.splice(index, 1)
    } else {
      cart.items[index].quantity = quantity
    }
    saveCart(cart)
  }

  return cart
}

// Remove item from cart
export function removeFromCart(menuItemId: string): Cart {
  return updateCartItemQuantity(menuItemId, 0)
}

// Set selected plan
export function setSelectedPlan(plan: { name: string; price: number; meals: number }): Cart {
  const cart = getCart()
  cart.selectedPlan = plan
  saveCart(cart)
  return cart
}

// Calculate cart totals
export function getCartTotals(cart: Cart): {
  itemCount: number
  subtotal: number
  discount: number
  total: number
} {
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cart.items.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0)

  // If a plan is selected, the plan price overrides item prices
  const total = cart.selectedPlan ? cart.selectedPlan.price : subtotal
  const discount = cart.selectedPlan ? Math.max(0, subtotal - cart.selectedPlan.price) : 0

  return { itemCount, subtotal, discount, total }
}

// Fetch menu from CRM
export async function fetchMenu(): Promise<MenuItem[]> {
  try {
    const response = await fetch(`${CRM_API_URL}/api/public/menu`)
    if (!response.ok) throw new Error('Failed to fetch menu')
    const data = await response.json()
    return data.items
  } catch (error) {
    console.error('Error fetching menu:', error)
    return []
  }
}

// Submit order to CRM
export interface OrderCustomer {
  name: string
  email: string
  phone?: string
  deliveryAddress: string
  deliveryNotes?: string
  neighborhood?: string
}

export interface OrderSubmission {
  customer: OrderCustomer
  deliveryDate: string
  deliveryWindow?: 'morning' | 'afternoon' | 'evening'
  items: { menuItemId: string; quantity: number; notes?: string }[]
  notes?: string
  visitorId?: string
}

export async function submitOrder(
  order: OrderSubmission
): Promise<{ success: boolean; orderId?: string; message: string }> {
  try {
    const response = await fetch(`${CRM_API_URL}/api/public/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        message: data.error || 'Failed to submit order',
      }
    }

    // Clear cart on successful order
    clearCart()

    return {
      success: true,
      orderId: data.orderId,
      message: data.message,
    }
  } catch (error) {
    console.error('Order submission error:', error)
    return {
      success: false,
      message: 'Network error. Please try again.',
    }
  }
}
