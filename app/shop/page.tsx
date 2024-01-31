'use client';
import React, {useState} from 'react';

import {useQuery} from '@tanstack/react-query';

import {getBrands} from '../src/api/admin';
import BrandNavBar from '../src/components/shop/BrandNavBar';
import ProductList from '../src/components/shop/ProductList';

function Page({searchParams: {brand}}: {searchParams: {brand: string}}) {
  const {data: brands} = useQuery({queryKey: ['brands'], queryFn: getBrands});
  const defaultBrand = brand || brands?.brands[0];
  const [selectedBrand, setSelectedBrand] = useState(brand || null);

  const selectBrandHandler = (brand: string) => {
    setSelectedBrand(brand);
  };

  return (
    <section className="mt-44 max-w-[1080px] mx-auto flex flex-col items-center">
      {defaultBrand && brands && (
        <>
          <BrandNavBar
            selectBrandHandler={selectBrandHandler}
            brands={brands?.brands}
            selectedBrand={selectedBrand ?? defaultBrand}
          />
          <ProductList defaultBrand={defaultBrand} selectedBrand={selectedBrand} />
        </>
      )}
    </section>
  );
}

export default Page;
