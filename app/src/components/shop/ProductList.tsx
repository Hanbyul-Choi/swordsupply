'use client';
import React from 'react';

import {useInfiniteQuery} from '@tanstack/react-query';
import {useInView} from 'react-intersection-observer';
import {BarLoader} from 'react-spinners';

import Card from './Card';
import {getProductsInfinity} from '../../api/products';
import useSessionStore from '../../store/session.store';

import type {Tables} from '@/app/types/supabase';

function ProductList({defaultBrand, selectedBrand}: {defaultBrand: string; selectedBrand: string | null}) {
  const {data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading} = useInfiniteQuery({
    queryKey: [selectedBrand ?? defaultBrand],
    queryFn: getProductsInfinity,
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
    },
  });

  const {user_id} = useSessionStore().session;

  const productData = data?.pages?.map(pageData => pageData.data).flat() || [];

  const {ref} = useInView({
    threshold: 1,
    onChange: inView => {
      if (!inView || !hasNextPage || isFetchingNextPage) return;
      fetchNextPage();
    },
  });

  if (isLoading) {
    return (
      <div className="absolute w-full h-full mx-auto flex justify-center items-center">
        <BarLoader color="#36d7b7" width={200} height={5} />
      </div>
    );
  }

  return (
    <>
      <h2 className="text-3xl mt-20">{(selectedBrand || defaultBrand).toUpperCase()}</h2>
      <div className="grid grid-cols-1 min-[320px]:grid-cols-2 sm:grid-cols-3 md:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 mt-24">
        {productData?.map((item: Tables<'products'>) => (
          <Card key={item.product_id} product={item} user_id={user_id} />
        ))}
      </div>
      {hasNextPage && (
        <div className="h-[55px] w-full text-center flex justify-center items-center mb-[10px]" ref={ref}>
          More products...
        </div>
      )}
    </>
  );
}

export default ProductList;
