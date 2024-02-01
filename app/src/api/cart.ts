import {supabase} from '@/supabase/supabase.config';
2;

import type {TablesInsert} from '@/app/types/supabase';

export const getCart = async (user_id: string) => {
  const {data} = await supabase.from('carts').select('*').eq('user_id', user_id).eq('order_status', false).single();
  return data;
};

export const postCart = async (newCarts: TablesInsert<'carts'>) => {
  const {error} = await supabase.from('carts').insert(newCarts);
  if (error) {
    console.log(error);
    throw error;
  }
};

export const updateCart = async (newCarts: TablesInsert<'carts'>) => {
  const {error} = await supabase
    .from('carts')
    .update(newCarts)
    .eq('cart_id', newCarts.cart_id)
    .eq('order_status', 'false');
  if (error) {
    console.log(error);
  }
};
