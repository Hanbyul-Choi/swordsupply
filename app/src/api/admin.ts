import {supabase} from '@/supabase/supabase.config';

import type {TablesInsert} from '@/app/types/supabase';

export const postPost = async (newPost: TablesInsert<'products'>) => {
  const {error} = await supabase.from('post').insert(newPost);
  if (error) {
    console.log(error);
    return error;
  }
};

export const getPostImgUrl = (imgName: string) => {
  const {data} = supabase.storage.from('post_images').getPublicUrl(`img/${imgName}`);
  return data.publicUrl;
};

export const uploadImg = async ({imgName, imgFile}: {imgName: string; imgFile: File}) => {
  const {error} = await supabase.storage.from('post_images').upload(`img/${imgName}`, imgFile, {
    cacheControl: '3600',
    upsert: false,
  });
  if (error) {
    throw error;
  }
};
