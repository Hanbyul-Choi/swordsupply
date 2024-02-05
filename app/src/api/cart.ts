import {supabase} from '@/supabase/supabase.config';
2;

import type {TablesInsert} from '@/app/types/supabase';

export const getCart = async (user_id: string) => {
  const {data, error} = await supabase
    .from('carts')
    .select('*')
    .eq('user_id', user_id)
    .eq('order_status', false)
    .single();

  return {data: data, error};
};

export const postCart = async (newCarts: TablesInsert<'carts'>) => {
  const {data, error} = await supabase.from('carts').insert(newCarts).select();
  if (error) {
    console.log(error);
    throw error;
  }
  return data;
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

export const orderCart = async (cart, price, orderDate, address_id) => {
  const {data, error} = await supabase
    .from('carts')
    .update({order_status: true, total_price: price, order_date: orderDate, address_id})
    .eq('cart_id', cart.cart_id)
    .select();
  if (error) {
    return error;
  }
  return data;
};

export const addAddress = async (address: TablesInsert<'address'>) => {
  const {data, error} = await supabase.from('address').insert(address).select().single();
  if (error) {
    console.log(error);
  }
  return data;
};

export const getOrderList = async ({pageParam = 1}: any) => {
  const {count} = await supabase.from('carts').select('*', {count: 'exact', head: true}).eq('order_status', true);

  const pageToFetch = pageParam * 19 + (pageParam - 1);

  const {data, error} = await supabase
    .from('carts')
    .select(`*,address(*),users(*)`)
    .eq('order_status', true)
    .range(pageToFetch - 19, pageToFetch)
    .order('created_at', {ascending: false});

  if (error) {
    throw error;
  }
  return {data, total_pages: Math.ceil((count ?? 0) / 20), page: pageParam, count};
};

export const getOrders = async userId => {
  const {data, error} = await supabase
    .from('carts')
    .select('*')
    .eq('user_id', userId)
    .eq('order_status', true)
    .order('created_at', {ascending: false});
  if (error) {
    console.log(error);
  }
  return data;
};
