'use client';
import React, {useEffect, useState} from 'react';

import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {useRouter} from 'next/navigation';
import {useInView} from 'react-intersection-observer';

import {getBrands} from '../src/api/admin';
import {getProductsInfinity} from '../src/api/products';
import ListCard from '../src/components/admin/listCard';
import PostModal from '../src/components/admin/postModal';
import BrandNavBar from '../src/components/shop/BrandNavBar';
import useSessionStore from '../src/store/session.store';

function Page() {
  const {data: brands} = useQuery({queryKey: ['brands'], queryFn: getBrands});
  const [selectedBrand, setSelectedBrand] = useState('');

  const {session, isLoaded} = useSessionStore();
  const router = useRouter();

  const selectBrandHandler = (brand: string) => {
    setSelectedBrand(brand);
  };

  const defaultBrand = brands?.brands[0];

  const {data, fetchNextPage, hasNextPage, isFetchingNextPage} = useInfiniteQuery({
    queryKey: [selectedBrand !== '' ? selectedBrand : defaultBrand],
    queryFn: getProductsInfinity,
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
    },
  });

  const productData = data?.pages?.map(pageData => pageData.data).flat();

  const {ref} = useInView({
    threshold: 1,
    onChange: inView => {
      if (!inView || !hasNextPage || isFetchingNextPage) return;
      fetchNextPage();
    },
  });

  useEffect(() => {
    if (brands) {
      setSelectedBrand(brands.brands[0]);
    }
    if (isLoaded) {
      if (session?.role !== 'admin') {
        router.push('/');
      }
    }
  }, [brands, isLoaded]);

  if (!productData) {
    return;
  }
  return (
    <div className="bg-[#ecf0f4]">
      <div className="max-w-[1280px] min-h-full flex flex-col justify-center items-center mx-auto p-4">
        {defaultBrand && session?.role === 'admin' ? (
          <>
            <h3 className="text-3xl w-fit my-10">상품 관리</h3>
            <section className="text-sm">
              <div className="flex justify-between w-full py-2">
                <BrandNavBar
                  selectBrandHandler={selectBrandHandler}
                  brands={brands?.brands}
                  selectedBrand={selectedBrand}
                />
                <PostModal />
              </div>
              <table className="bg-white border-[1px] shadow-[0_1px_4px_0_rgba(53,60,73,0.08)]">
                <thead className="w-full">
                  <tr className="w-full border-b-[1px]">
                    <th className="w-20">No.</th>
                    <th className="w-96 text-start px-4 p-2">상품명</th>
                    <th className="w-40 text-center">판매가</th>
                    <th className="w-28 text-center">상태</th>
                    <th className="w-32 text-center">등록일</th>
                    <th className="w-24 text-center"></th>
                  </tr>
                </thead>
                {productData.map((product, index) => (
                  <ListCard product={product} index={index} key={index} />
                ))}
              </table>
              {hasNextPage && (
                <div className="h-[55px] w-full text-center flex justify-center items-center mb-[10px]" ref={ref}>
                  More products...
                </div>
              )}
            </section>
          </>
        ) : (
          <div className="text-center text-2xl">잘못된 접근입니다.</div>
        )}
      </div>
      <div className="bg-[#ecf0f4] h-[146.5px]" />
    </div>
  );
}

export default Page;
