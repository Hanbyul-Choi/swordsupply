import React from 'react';

import {getBestSeller} from '../../api/products';
import Card from '../shop/Card';

import type {Tables} from '@/app/types/supabase';

export const mock = [
  {
    product_name: '오리지널 블랙(BLK) 8oz, 1oz',
    options: ['8oz', '1oz'],
    eventPrice: 45000,
    originPrice: 60000,
    product_id: '1',
    description:
      'A new twist on an old classic. Specifically formulated to comply with the 2022 European regulations, this REACH compliant ink does not disappoint The ultra smooth, super rich black has the same consistency and goodness as our tried and true OG black with a slightly more matte finish. Great for lining and packing in solid ultra dark black areas. When mixed down for washes it creates a smooth almost pastel finish.',
    thumbnail:
      'https://static.wixstatic.com/media/53c611_4b60408a8122453ca73c87b20b03bb03~mv2.jpg/v1/fill/w_625,h_625,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/53c611_4b60408a8122453ca73c87b20b03bb03~mv2.jpg',
    images: [
      'https://static.wixstatic.com/media/53c611_4b60408a8122453ca73c87b20b03bb03~mv2.jpg/v1/fill/w_625,h_625,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/53c611_4b60408a8122453ca73c87b20b03bb03~mv2.jpg',
      'https://static.wixstatic.com/media/53c611_73d37bc685eb48ef9aa7124a43b72caf~mv2.jpg/v1/fill/w_355,h_355,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/53c611_73d37bc685eb48ef9aa7124a43b72caf~mv2.jpg',
      'https://static.wixstatic.com/media/53c611_73d37bc685eb48ef9aa7124a43b72caf~mv2.jpg/v1/fill/w_355,h_355,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/53c611_73d37bc685eb48ef9aa7124a43b72caf~mv2.jpg',
      'https://static.wixstatic.com/media/53c611_73d37bc685eb48ef9aa7124a43b72caf~mv2.jpg/v1/fill/w_355,h_355,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/53c611_73d37bc685eb48ef9aa7124a43b72caf~mv2.jpg',
      'https://static.wixstatic.com/media/53c611_73d37bc685eb48ef9aa7124a43b72caf~mv2.jpg/v1/fill/w_355,h_355,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/53c611_73d37bc685eb48ef9aa7124a43b72caf~mv2.jpg',
    ],
  },
  {
    product_name: '오리지널 white(WHT) 8oz, 1oz',
    options: [],
    eventPrice: 45000,
    originPrice: 60000,
    product_id: '2',
    images: [
      'https://static.wixstatic.com/media/53c611_4b60408a8122453ca73c87b20b03bb03~mv2.jpg/v1/fill/w_625,h_625,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/53c611_4b60408a8122453ca73c87b20b03bb03~mv2.jpg',
      'https://static.wixstatic.com/media/53c611_73d37bc685eb48ef9aa7124a43b72caf~mv2.jpg/v1/fill/w_355,h_355,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/53c611_73d37bc685eb48ef9aa7124a43b72caf~mv2.jpg',
    ],
    description:
      'A new twist on an old classic. Specifically formulated to comply with the 2022 European regulations, this REACH compliant ink does not disappoint The ultra smooth, super rich black has the same consistency and goodness as our tried and true OG black with a slightly more matte finish. Great for lining and packing in solid ultra dark black areas. When mixed down for washes it creates a smooth almost pastel finish.',
    thumbnail:
      'https://static.wixstatic.com/media/53c611_73d37bc685eb48ef9aa7124a43b72caf~mv2.jpg/v1/fill/w_355,h_355,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/53c611_73d37bc685eb48ef9aa7124a43b72caf~mv2.jpg',
  },
  {
    product_name: '오리지널 블랙(BLK) 8oz, 1oz',
    options: ['8oz', '1oz'],
    eventPrice: null,
    originPrice: 60000,
    product_id: '3',
    images: [
      'https://static.wixstatic.com/media/53c611_4b60408a8122453ca73c87b20b03bb03~mv2.jpg/v1/fill/w_625,h_625,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/53c611_4b60408a8122453ca73c87b20b03bb03~mv2.jpg',
      'https://static.wixstatic.com/media/53c611_73d37bc685eb48ef9aa7124a43b72caf~mv2.jpg/v1/fill/w_355,h_355,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/53c611_73d37bc685eb48ef9aa7124a43b72caf~mv2.jpg',
    ],
    description:
      'A new twist on an old classic. Specifically formulated to comply with the 2022 European regulations, this REACH compliant ink does not disappoint The ultra smooth, super rich black has the same consistency and goodness as our tried and true OG black with a slightly more matte finish. Great for lining and packing in solid ultra dark black areas. When mixed down for washes it creates a smooth almost pastel finish.',
    thumbnail:
      'https://static.wixstatic.com/media/53c611_72e10fa0071c44c4a1bece38a283d19d~mv2.jpg/v1/fill/w_355,h_355,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/53c611_72e10fa0071c44c4a1bece38a283d19d~mv2.jpg',
  },
  {
    product_name: '오리지널 블랙(BLK) 8oz, 1oz',
    options: ['8oz', '1oz'],
    eventPrice: 45000,
    originPrice: 60000,
    product_id: '4',
    images: [
      'https://static.wixstatic.com/media/53c611_4b60408a8122453ca73c87b20b03bb03~mv2.jpg/v1/fill/w_625,h_625,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/53c611_4b60408a8122453ca73c87b20b03bb03~mv2.jpg',
      'https://static.wixstatic.com/media/53c611_73d37bc685eb48ef9aa7124a43b72caf~mv2.jpg/v1/fill/w_355,h_355,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/53c611_73d37bc685eb48ef9aa7124a43b72caf~mv2.jpg',
    ],
    description:
      'A new twist on an old classic. Specifically formulated to comply with the 2022 European regulations, this REACH compliant ink does not disappoint The ultra smooth, super rich black has the same consistency and goodness as our tried and true OG black with a slightly more matte finish. Great for lining and packing in solid ultra dark black areas. When mixed down for washes it creates a smooth almost pastel finish.',
    thumbnail:
      'https://static.wixstatic.com/media/53c611_4b60408a8122453ca73c87b20b03bb03~mv2.jpg/v1/fill/w_625,h_625,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/53c611_4b60408a8122453ca73c87b20b03bb03~mv2.jpg',
  },
  {
    product_name: '오리지널 블랙(BLK) 8oz, 1oz',
    options: ['8oz', '1oz'],
    eventPrice: 45000,
    originPrice: 60000,
    product_id: '5',
    images: [
      'https://static.wixstatic.com/media/53c611_4b60408a8122453ca73c87b20b03bb03~mv2.jpg/v1/fill/w_625,h_625,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/53c611_4b60408a8122453ca73c87b20b03bb03~mv2.jpg',
      'https://static.wixstatic.com/media/53c611_73d37bc685eb48ef9aa7124a43b72caf~mv2.jpg/v1/fill/w_355,h_355,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/53c611_73d37bc685eb48ef9aa7124a43b72caf~mv2.jpg',
    ],
    description:
      'A new twist on an old classic. Specifically formulated to comply with the 2022 European regulations, this REACH compliant ink does not disappoint The ultra smooth, super rich black has the same consistency and goodness as our tried and true OG black with a slightly more matte finish. Great for lining and packing in solid ultra dark black areas. When mixed down for washes it creates a smooth almost pastel finish.',
    thumbnail:
      'https://static.wixstatic.com/media/53c611_4b60408a8122453ca73c87b20b03bb03~mv2.jpg/v1/fill/w_625,h_625,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/53c611_4b60408a8122453ca73c87b20b03bb03~mv2.jpg',
  },
  {
    product_name: '오리지널 white(WHT) 8oz, 1oz',
    options: [],
    eventPrice: null,
    originPrice: 60000,
    product_id: '6',
    images: [
      'https://static.wixstatic.com/media/53c611_4b60408a8122453ca73c87b20b03bb03~mv2.jpg/v1/fill/w_625,h_625,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/53c611_4b60408a8122453ca73c87b20b03bb03~mv2.jpg',
      'https://static.wixstatic.com/media/53c611_73d37bc685eb48ef9aa7124a43b72caf~mv2.jpg/v1/fill/w_355,h_355,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/53c611_73d37bc685eb48ef9aa7124a43b72caf~mv2.jpg',
    ],
    description:
      'A new twist on an old classic. Specifically formulated to comply with the 2022 European regulations, this REACH compliant ink does not disappoint The ultra smooth, super rich black has the same consistency and goodness as our tried and true OG black with a slightly more matte finish. Great for lining and packing in solid ultra dark black areas. When mixed down for washes it creates a smooth almost pastel finish.',
    thumbnail:
      'https://static.wixstatic.com/media/53c611_4b60408a8122453ca73c87b20b03bb03~mv2.jpg/v1/fill/w_625,h_625,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/53c611_4b60408a8122453ca73c87b20b03bb03~mv2.jpg',
  },
  {
    product_name: '오리지널 white(WHT) 8oz, 1oz',
    options: [],
    eventPrice: 45000,
    originPrice: 60000,
    product_id: '7',
    images: [
      'https://static.wixstatic.com/media/53c611_4b60408a8122453ca73c87b20b03bb03~mv2.jpg/v1/fill/w_625,h_625,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/53c611_4b60408a8122453ca73c87b20b03bb03~mv2.jpg',
      'https://static.wixstatic.com/media/53c611_73d37bc685eb48ef9aa7124a43b72caf~mv2.jpg/v1/fill/w_355,h_355,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/53c611_73d37bc685eb48ef9aa7124a43b72caf~mv2.jpg',
    ],
    description:
      'A new twist on an old classic. Specifically formulated to comply with the 2022 European regulations, this REACH compliant ink does not disappoint The ultra smooth, super rich black has the same consistency and goodness as our tried and true OG black with a slightly more matte finish. Great for lining and packing in solid ultra dark black areas. When mixed down for washes it creates a smooth almost pastel finish.',
    thumbnail:
      'https://static.wixstatic.com/media/53c611_4b60408a8122453ca73c87b20b03bb03~mv2.jpg/v1/fill/w_625,h_625,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/53c611_4b60408a8122453ca73c87b20b03bb03~mv2.jpg',
  },
  {
    product_name: '오리지널 white(WHT) 8oz, 1oz',
    options: [],
    eventPrice: null,
    originPrice: 60000,
    product_id: '8',
    images: [
      'https://static.wixstatic.com/media/53c611_4b60408a8122453ca73c87b20b03bb03~mv2.jpg/v1/fill/w_625,h_625,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/53c611_4b60408a8122453ca73c87b20b03bb03~mv2.jpg',
      'https://static.wixstatic.com/media/53c611_73d37bc685eb48ef9aa7124a43b72caf~mv2.jpg/v1/fill/w_355,h_355,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/53c611_73d37bc685eb48ef9aa7124a43b72caf~mv2.jpg',
    ],
    description:
      'A new twist on an old classic. Specifically formulated to comply with the 2022 European regulations, this REACH compliant ink does not disappoint The ultra smooth, super rich black has the same consistency and goodness as our tried and true OG black with a slightly more matte finish. Great for lining and packing in solid ultra dark black areas. When mixed down for washes it creates a smooth almost pastel finish.',
    thumbnail:
      'https://static.wixstatic.com/media/53c611_4b60408a8122453ca73c87b20b03bb03~mv2.jpg/v1/fill/w_625,h_625,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/53c611_4b60408a8122453ca73c87b20b03bb03~mv2.jpg',
  },
];

async function BestSeller() {
  const bestSellerData = await getBestSeller();
  return (
    <section className="flex flex-col justify-center items-center">
      <h3 className="text-2xl font-roboto font-bold underline">BEST SELLER</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
        {bestSellerData?.map((item: Tables<'products'>) => (
          <Card key={item.product_id} product={item} />
        ))}
      </div>
    </section>
  );
}

export default BestSeller;
