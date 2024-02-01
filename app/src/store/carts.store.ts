import {create} from 'zustand';

import type {Tables} from '@/app/types/supabase';

interface CartStore {
  cart: Tables<'carts'> | null;
  setCart: (newCart: Tables<'carts'> | null) => void;
}

const useCartStore = create<CartStore>(set => ({
  cart: null,
  setCart: newCart => set({cart: newCart}),
}));

export default useCartStore;

// cart = {cart_id: '', }
