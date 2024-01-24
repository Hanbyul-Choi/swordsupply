'use client';
import React, {useState} from 'react';

import {useQuery} from '@tanstack/react-query';

import {getBrands} from '../src/api/admin';
import BrandNavBar from '../src/components/shop/BrandNavBar';
import ProductList from '../src/components/shop/ProductList';

function Page() {
  const {data: brands} = useQuery({queryKey: ['brands'], queryFn: getBrands});
  const [selectedBrand, setSelectedBrand] = useState('');

  const selectBrandHandler = (brand: string) => {
    setSelectedBrand(brand);
  };

  const defaultBrand = brands?.brands[0];

  return (
    <section className="mt-52 max-w-[1080px] mx-auto flex flex-col items-center">
      {defaultBrand && (
        <>
          <BrandNavBar selectBrandHandler={selectBrandHandler} brands={brands?.brands} />
          <ProductList defaultBrand={defaultBrand} selectedBrand={selectedBrand} />
        </>
      )}
    </section>
  );
}

export default Page;
