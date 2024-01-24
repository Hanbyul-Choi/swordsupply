'use client';
import React from 'react';

import {useQuery} from '@tanstack/react-query';

import {getProductsWithBrand} from '@/app/src/api/products';
import Card from '@/app/src/components/Card';

import type {Tables} from '@/app/types/supabase';

function Page({params: {brand}}: {params: {brand: string}}) {
  const {data} = useQuery({queryKey: [brand], queryFn: () => getProductsWithBrand(brand)});
  return (
    <section className="mt-52 max-w-[1080px] mx-auto flex flex-col items-center">
      <h2 className="text-3xl">{brand.toUpperCase()}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-40">
        {data?.map((item: Tables<'products'>) => (
          <Card key={item.product_id} product={item} />
        ))}
      </div>
    </section>
  );
}

export default Page;
