import {supabase} from '@/supabase/supabase.config';

import {getBestSeller} from './products';

import type {TablesInsert, TablesUpdate} from '@/app/types/supabase';

export const postPost = async (newPost: TablesInsert<'products'>) => {
  const {error} = await supabase.from('products').insert(newPost);
  if (error) {
    console.log(error);
    return error;
  }
};

export const deletePost = async (id: string) => {
  const {error} = await supabase.from('products').delete().eq('product_id', id);
  if (error) {
    console.log(error);
    return error;
  }
};

export const uploadImg = async ({imgName, imgFile}: {imgName: string; imgFile: File}) => {
  const {error} = await supabase.storage.from('post_images').upload(`img/${imgName}`, imgFile, {
    cacheControl: '3600',
    upsert: false,
  });
  if (error) {
    console.log(error);
  }
};

export const getPostImgUrl = (imgName: string) => {
  const {data} = supabase.storage.from('post_images').getPublicUrl(`img/${imgName}`);
  return data.publicUrl;
};

export const getBrands = async () => {
  const {data} = await supabase.from('brand').select('*').single();
  return data;
};

export const updateBrands = async (newBrands: string[]) => {
  const {data} = await supabase.from('brand').update({brands: newBrands}).eq('id', 1).select();
  return data;
};

export const updateProducts = async (newProducts: TablesUpdate<'products'>, id: string) => {
  const {data, error} = await supabase.from('products').update(newProducts).eq('product_id', id).select();
  if (error) {
    console.log(error);
  }
  return data;
};

export const updateProductStatus = async (id: string, status: string) => {
  const {data, error} = await supabase.from('products').update({status}).eq('product_id', id).select();
  if (error) {
    console.log(error);
  }
  return data;
};

export const updateBestSeller = async (id: string, best_seller: boolean) => {
  const bestSeller = await getBestSeller();
  if (bestSeller?.length! >= 8 && best_seller) {
    return alert('베스트 셀러는 8개까지만 등록이 가능합니다.\n다른 상품을 해제하세요');
  }
  const {data, error} = await supabase.from('products').update({best_seller}).eq('product_id', id).select();
  if (error) {
    console.log(error);
  }
  return data;
};

export const deleteBrandProduct = async brand => {
  const {data, error} = await supabase.from('products').update({status: 'disabled'}).eq('brand', brand).select();
  if (error) {
    console.log(error);
  }
  return data;
};
