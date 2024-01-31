'use client';
import React from 'react';

import {useQuery} from '@tanstack/react-query';

import Card from './Card';
import {getProductsWithBrand} from '../../api/products';

import type {Tables} from '@/app/types/supabase';

function ProductList({defaultBrand, selectedBrand}: {defaultBrand: string; selectedBrand: string}) {
  const {data} = useQuery({
    queryKey: [selectedBrand || defaultBrand],
    queryFn: () => getProductsWithBrand(selectedBrand || defaultBrand),
  });

  return (
    <>
      <h2 className="text-3xl mt-10">{(selectedBrand || defaultBrand).toUpperCase()}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-24">
        {data?.map((item: Tables<'products'>) => (
          <Card key={item.product_id} product={item} />
        ))}
      </div>
    </>
  );
}

export default ProductList;
