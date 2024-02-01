import {supabase} from '@/supabase/supabase.config';

export const getProductsWithBrand = async (brand: string) => {
  const {data} = await supabase.from('products').select('*').eq('brand', brand).order('created_at', {ascending: false});
  return data;
};

export const getBestSeller = async () => {
  const {data} = await supabase.from('products').select('*').eq('best_seller', true).range(0, 7);
  return data;
};

export const getProductsInfinity = async ({queryKey: brand, pageParam = 1}: any) => {
  const {count} = await supabase.from('products').select('*', {count: 'exact', head: true}).eq('brand', brand);

  const pageToFetch = pageParam * 9 + (pageParam - 1);

  const {data, error} = await supabase
    .from('products')
    .select(`*`)
    .eq('brand', brand)
    .range(pageToFetch - 9, pageToFetch)
    .order('created_at', {ascending: false});

  if (error) {
    throw error;
  }
  return {data, total_pages: Math.ceil((count ?? 0) / 10), page: pageParam, count};
};
export const getCartProducts = async (cartProducts: string[]) => {
  const {data} = await supabase.from('products').select('*').in('product_id', cartProducts);
  return data;
};
