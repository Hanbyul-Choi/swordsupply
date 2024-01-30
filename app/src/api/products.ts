import {supabase} from '@/supabase/supabase.config';

export const getProductsWithBrand = async (brand: string) => {
  const {data} = await supabase.from('products').select('*').eq('brand', brand);
  return data;
};

export const getBestSeller = async () => {
  const {data} = await supabase.from('products').select('*').eq('best_seller', true).range(0, 7);
  return data;
};
