import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  price: number
  pricePromo?:number
  image?: string
  quantidade: number
}

interface CartState {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  incrementItem: (id: string) => void
  decrementItem: (id: string) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],

      addToCart: (item) =>
        set((state) => {
          const existente = state.cart.find((i) => i.id === item.id)
          if (existente) {
            return {
              cart: state.cart.map((i) =>
                i.id === item.id
                  ? { ...i, quantidade: i.quantidade + item.quantidade }
                  : i
              ),
            }
          }

          return {
            cart: [...state.cart, { ...item, quantidade: item.quantidade }],
          }
        }),

      incrementItem: (id) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id
              ? { ...item, quantidade: item.quantidade + 1 }
              : item
          ),
        })),

      decrementItem: (id) =>
        set((state) => {
          const item = state.cart.find((i) => i.id === id)
          if (!item) return {}
          if (item.quantidade <= 1) {
            return {
              cart: state.cart.filter((i) => i.id !== id),
            }
          }
          return {
            cart: state.cart.map((i) =>
              i.id === id
                ? { ...i, quantidade: i.quantidade - 1 }
                : i
            ),
          }
        }),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((i) => i.id !== id),
        })),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'cart-storage',
    }
  )
)
