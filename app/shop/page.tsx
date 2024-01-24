'use client';
import React, {useEffect, useState} from 'react';

import {useQuery} from '@tanstack/react-query';

import {getBrands} from '../src/api/admin';
import BrandNavBar from '../src/components/shop/BrandNavBar';
import ProductList from '../src/components/shop/ProductList';

function Page() {
  const {data: brands} = useQuery({queryKey: ['brands'], queryFn: getBrands});
  const defaultBrand = brands?.brands[0];
  const [selectedBrand, setSelectedBrand] = useState('');

  const selectBrandHandler = (brand: string) => {
    setSelectedBrand(brand);
  };

  useEffect(() => {
    if (brands) {
      setSelectedBrand(brands.brands[0]);
    }
  }, [brands]);

  return (
    <section className="mt-52 max-w-[1080px] mx-auto flex flex-col items-center">
      {defaultBrand && brands && (
        <>
          <BrandNavBar selectBrandHandler={selectBrandHandler} brands={brands?.brands} selectedBrand={selectedBrand} />
          <ProductList defaultBrand={defaultBrand} selectedBrand={selectedBrand} />
        </>
      )}
    </section>
  );
}

export default Page;
