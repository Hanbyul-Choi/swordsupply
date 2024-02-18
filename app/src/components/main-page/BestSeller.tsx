import React from 'react';

import {getBestSeller} from '../../api/products';
import Card from '../shop/Card';

import type {Tables} from '@/app/types/supabase';

async function BestSeller() {
  const bestSellerData = await getBestSeller();
  return (
    <>
      {bestSellerData.length > 0 && (
        <section className="flex flex-col justify-center items-center mt-2">
          <h3 className="text-4xl font-roboto font-bold ">BEST SELLER</h3>
          <div className="grid grid-cols-1 min-[320px]:grid-cols-2 md:gap-4 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-10">
            {bestSellerData?.map((item: Tables<'products'>) => (
              <Card key={item.product_id} product={item} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default BestSeller;
