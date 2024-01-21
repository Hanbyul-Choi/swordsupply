import React from 'react';

import Card from '@/app/src/components/Card';
import {mock} from '@/app/src/components/main-page/BestSeller';

function Page({params: {brand}}: {params: {brand: string}}) {
  return (
    <section className="mt-52 max-w-[1080px] mx-auto flex flex-col items-center">
      <h2 className="text-3xl">{brand.toUpperCase()}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-40">
        {mock.map(item => (
          <Card
            key={item.productName}
            productName={item.productName}
            options={item.options}
            eventPrice={item.eventPrice}
            originPrice={item.originPrice}
            thumbnail={item.thumbnail}
            product_id={item.product_id}
          />
        ))}
      </div>
    </section>
  );
}

export default Page;
