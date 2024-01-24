import {supabase} from '@/supabase/supabase.config';

import type {TablesInsert} from '@/app/types/supabase';

export const postPost = async (newPost: TablesInsert<'products'>) => {
  const {error} = await supabase.from('products').insert(newPost);
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
  const {data} = await supabase.from('brand').update({brands: newBrands}).eq('id', 1);
  return data;
};
