'use client';
import React, {useEffect, useState} from 'react';

import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {BarLoader} from 'react-spinners';

import {getOrders} from '../src/api/cart';
import OrderCard from '../src/components/myorder/OrderCard';
import useSessionStore from '../src/store/session.store';

function Page() {
  const router = useRouter();
  const {session, isLoaded} = useSessionStore();
  const [orders, setOrders] = useState(null);

  const fetchOrder = async user_id => {
    const orderData = await getOrders(user_id);
    if (!orderData) {
      setOrders([]);
    } else {
      setOrders(orderData);
    }
  };
  useEffect(() => {
    if (isLoaded) {
      if (!session) {
        alert('로그인이 필요합니다');
        router.push('/');
        return;
      }
      fetchOrder(session.user_id);
    }
  }, [isLoaded]);

  if (orders === null || !isLoaded) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <BarLoader color="#36d7b7" width={200} height={5} />
      </div>
    );
  }
  if (isLoaded && orders.length == 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center mt-16 gap-12">
        <p className="text-2xl">주문목록이 없습니다.</p>
        <div className="w-3/4 bg-slate-400 h-[1px]" />
        <Link href={'/cart'} className="border-2 p-2 border-black hover:bg-black hover:text-white">
          -{'>'} 카트로 이동
        </Link>
      </div>
    );
  }
  if (isLoaded && orders.length > 0) {
    return (
      <div className="max-w-[600px] mx-auto flex flex-col items-center justify-center mt-16 gap-8 p-4">
        <h1 className="font-bold text-2xl">주문내역</h1>
        {orders.map(data => {
          return <OrderCard data={data} key={data.cart_id} />;
        })}
      </div>
    );
  }
}

export default Page;
