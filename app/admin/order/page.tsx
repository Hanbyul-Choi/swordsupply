'use client';
import React, {useEffect} from 'react';

import {useInfiniteQuery} from '@tanstack/react-query';
import {useRouter} from 'next/navigation';
import {useInView} from 'react-intersection-observer';

import {getOrderList} from '@/app/src/api/cart';
import useSessionStore from '@/app/src/store/session.store';

function Page() {
  const {session, isLoaded} = useSessionStore();
  const router = useRouter();

  const {data, fetchNextPage, hasNextPage, isFetchingNextPage} = useInfiniteQuery({
    queryKey: ['order_list'],
    queryFn: getOrderList,
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
    },
  });

  const order_list = data?.pages?.map(pageData => pageData.data).flat();

  const {ref} = useInView({
    threshold: 1,
    onChange: inView => {
      if (!inView || !hasNextPage || isFetchingNextPage) return;
      fetchNextPage();
    },
  });

  useEffect(() => {
    if (isLoaded) {
      if (session?.role !== 'admin') {
        router.push('/');
      }
    }
  }, [isLoaded]);

  return (
    <div className="bg-[#ecf0f4]">
      <div className="max-w-[1280px] flex flex-col justify-center items-center mx-auto p-4">
        {session?.role === 'admin' ? (
          <>
            <h3 className="text-3xl w-fit my-10">주문 내역 조회</h3>
            <section className="text-sm">
              <table className="bg-white border-[1px] shadow-[0_1px_4px_0_rgba(53,60,73,0.08)]">
                <thead className="w-full">
                  <tr className="w-full border-b-[1px]">
                    <th className="w-20">No.</th>
                    <th className="w-40 text-start px-4 p-2">주문자</th>
                    <th className="w-96 text-start px-4 p-2">
                      <p className="w-full text-start px-4 p-2">주문상품</p>
                      <div className="flex font-normal ">
                        <p className="w-1/3 text-start px-4">상품명</p>
                        <p className="w-1/3 text-start px-4">옵션</p>
                        <p className="w-1/3 text-start px-4">개수</p>
                      </div>
                    </th>
                    <th className="w-40 text-center">주문금액</th>
                    <th className="w-28 text-center">전화번호</th>
                    <th className="w-32 text-center">주문날짜</th>
                  </tr>
                </thead>
                {order_list?.map((order, index) =>
                  // <orderCart order={order} index={index} key={index} />
                  {
                    return (
                      <tbody key={index}>
                        <tr>
                          {/* <td className="w-20 text-center">{index + 1}.</td>
        <td className="w-96 text-start flex gap-2 items-center p-2">
          <div className="relative w-14 h-14 border-[1px]">
            <Image
              src={product.thumbnail ?? '/'}
              alt={product.product_name ?? '썸네일 이미지'}
              fill
              sizes="100"
              style={{objectFit: 'cover'}}
            />
          </div>
          <Link href={`/shop/detail/${product.product_id}?brand=${product.brand}`} className="flex gap-1">
            {product.product_name}
            <div className={`bg-[#fe5356] text-white px-2 rounded-sm ${product.best_seller || 'hidden'}`}>BEST</div>
            <div className="text-slate-400">
              <GoLinkExternal />
            </div>
          </Link>
        </td> */}
                        </tr>
                      </tbody>
                    );
                  },
                )}
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
    </div>
  );
}

export default Page;
