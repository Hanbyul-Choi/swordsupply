import React from 'react';

import Card from '../Card';

export const mock = [
  {
    productName: '오리지널 블랙(BLK) 8oz, 1oz',
    options: ['8oz', '1oz'],
    eventPrice: 45000,
    originPrice: 60000,
    product_id: '1',
    thumbnail:
      'https://static.wixstatic.com/media/53c611_4b60408a8122453ca73c87b20b03bb03~mv2.jpg/v1/fill/w_625,h_625,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/53c611_4b60408a8122453ca73c87b20b03bb03~mv2.jpg',
  },
  {
    productName: '오리지널 white(WHT) 8oz, 1oz',
    options: [],
    eventPrice: 45000,
    originPrice: 60000,
    product_id: '2',
    thumbnail:
      'https://static.wixstatic.com/media/53c611_73d37bc685eb48ef9aa7124a43b72caf~mv2.jpg/v1/fill/w_355,h_355,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/53c611_73d37bc685eb48ef9aa7124a43b72caf~mv2.jpg',
  },
  {
    productName: '오리지널 블랙(BLK) 8oz, 1oz',
    options: ['8oz', '1oz'],
    eventPrice: 45000,
    originPrice: 60000,
    product_id: '3',
    thumbnail:
      'https://static.wixstatic.com/media/53c611_72e10fa0071c44c4a1bece38a283d19d~mv2.jpg/v1/fill/w_355,h_355,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/53c611_72e10fa0071c44c4a1bece38a283d19d~mv2.jpg',
  },
  {
    productName: '오리지널 블랙(BLK) 8oz, 1oz',
    options: ['8oz', '1oz'],
    eventPrice: 45000,
    originPrice: 60000,
    product_id: '4',
    thumbnail:
      'https://static.wixstatic.com/media/53c611_4b60408a8122453ca73c87b20b03bb03~mv2.jpg/v1/fill/w_625,h_625,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/53c611_4b60408a8122453ca73c87b20b03bb03~mv2.jpg',
  },
  {
    productName: '오리지널 블랙(BLK) 8oz, 1oz',
    options: ['8oz', '1oz'],
    eventPrice: 45000,
    originPrice: 60000,
    product_id: '5',
    thumbnail:
      'https://static.wixstatic.com/media/53c611_4b60408a8122453ca73c87b20b03bb03~mv2.jpg/v1/fill/w_625,h_625,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/53c611_4b60408a8122453ca73c87b20b03bb03~mv2.jpg',
  },
  {
    productName: '오리지널 white(WHT) 8oz, 1oz',
    options: [],
    eventPrice: 45000,
    originPrice: 60000,
    product_id: '6',
    thumbnail:
      'https://static.wixstatic.com/media/53c611_4b60408a8122453ca73c87b20b03bb03~mv2.jpg/v1/fill/w_625,h_625,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/53c611_4b60408a8122453ca73c87b20b03bb03~mv2.jpg',
  },
  {
    productName: '오리지널 white(WHT) 8oz, 1oz',
    options: [],
    eventPrice: 45000,
    originPrice: 60000,
    product_id: '7',
    thumbnail:
      'https://static.wixstatic.com/media/53c611_4b60408a8122453ca73c87b20b03bb03~mv2.jpg/v1/fill/w_625,h_625,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/53c611_4b60408a8122453ca73c87b20b03bb03~mv2.jpg',
  },
  {
    productName: '오리지널 white(WHT) 8oz, 1oz',
    options: [],
    eventPrice: 45000,
    originPrice: 60000,
    product_id: '8',
    thumbnail:
      'https://static.wixstatic.com/media/53c611_4b60408a8122453ca73c87b20b03bb03~mv2.jpg/v1/fill/w_625,h_625,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/53c611_4b60408a8122453ca73c87b20b03bb03~mv2.jpg',
  },
];

function BestSeller() {
  return (
    <section className="flex flex-col justify-center items-center">
      <h3 className="text-2xl font-roboto font-bold underline">BEST SELLER</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
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

export default BestSeller;
