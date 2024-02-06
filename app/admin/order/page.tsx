'use client';
import React, {useEffect} from 'react';

import {useInfiniteQuery, useQueryClient} from '@tanstack/react-query';
import {useRouter} from 'next/navigation';
import {useInView} from 'react-intersection-observer';
import {BarLoader} from 'react-spinners';

import {deleteOrder, getOrderList} from '@/app/src/api/cart';
import OrderCart from '@/app/src/components/admin/OrderCart';
import useSessionStore from '@/app/src/store/session.store';

function Page() {
  const {session, isLoaded} = useSessionStore();
  const router = useRouter();
  const queryClient = useQueryClient();
  const {data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading} = useInfiniteQuery({
    queryKey: ['order_list'],
    queryFn: getOrderList,
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
    },
  });

  const clickDeleteOrder = async (cart_id: string) => {
    if (confirm('주문을 삭제하시겠습니까?')) {
      await deleteOrder(cart_id);
      await queryClient.invalidateQueries({queryKey: ['order_list']});
      alert('주문이 삭제되었습니다.');
    }
  };
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

  if (isLoading || !isLoaded) {
    return <BarLoader color="#36d7b7 min-h-screen" />;
  }

  return (
    <div className="bg-[#ecf0f4]">
      <div className="max-w-[1280px] flex flex-col justify-center items-center mx-auto p-4">
        {order_list && session?.role === 'admin' ? (
          <>
            <h3 className="text-3xl w-fit my-10">주문 확인</h3>
            <section className="text-sm">
              <table className="bg-white border-[1px] shadow-[0_1px_4px_0_rgba(53,60,73,0.08)]">
                <thead className="w-full">
                  <tr className="w-full border-b-[1px]">
                    <th className="w-20">No.</th>
                    <th className="w-20 px-4 p-2">주문자</th>
                    <th className="w-28 text-center">전화번호</th>
                    <th className="w-20 text-center">배송지</th>
                    <th className="w-96 text-center p-2">
                      <p className="w-full p-2">주문상품</p>
                      <div className="flex font-normal justify-center">
                        <p className="w-1/2">상품명</p>
                        <p className="w-1/4">옵션</p>
                        <p className="w-1/4">개수</p>
                      </div>
                    </th>
                    <th className="w-40 text-center">주문총액</th>
                    <th className="w-32 text-center">주문날짜</th>
                    <th className="w-12"></th>
                  </tr>
                </thead>
                {order_list.map((order, index) => (
                  <OrderCart order={order} index={index} key={index} clickDeleteOrder={clickDeleteOrder} />
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
    </div>
  );
}

export default Page;
