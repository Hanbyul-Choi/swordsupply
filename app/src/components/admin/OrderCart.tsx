'use client';
import React, {useState} from 'react';

import {addCommas, changeJson} from '../../utils/common';

import type {Tables} from '@/app/types/supabase';

interface Props {
  order: Tables<'carts'> & {users: Tables<'users'>} & {address: Tables<'address'>};
  index: number;
  clickDeleteOrder: (cart_id: string) => void;
}

function OrderCart({order, index, clickDeleteOrder}: Props) {
  const {users, address} = order;
  const [showAddress, setShowAddress] = useState(false);
  return (
    <tbody className="border-b text-center">
      <tr className="">
        <td className="">{index + 1}.</td>
        <td>{users.user_name}</td>
        <td className="">{users.phone}</td>
        <td className="relative">
          <button
            className="border px-2"
            onClick={() => {
              setShowAddress(true);
            }}>
            주소보기
          </button>
          {showAddress && (
            <div className="absolute -right-60 bg-slate-200 text-start p-4 py-6 z-10">
              <button
                className="absolute bottom-2 right-2 border border-black px-2"
                onClick={() => {
                  setShowAddress(false);
                }}>
                닫기
              </button>
              <p>
                <strong>주소지</strong> : {address.address}
              </p>
              <p>
                <strong>상세주소</strong> : {address.detail_address}({address.extra_address})
              </p>
              <p>
                <strong>우편번호</strong> : {address.zonecode}
              </p>
            </div>
          )}
        </td>
        <td>
          {order.cart_list.map((product, i) => (
            <div className="flex font-normal" key={i}>
              <p className="w-1/2">{changeJson(product).product_name}</p>
              <p className="w-1/4">{changeJson(product).option || '-'}</p>
              <p className="w-1/4">{changeJson(product).count}</p>
            </div>
          ))}
        </td>
        <td className="">{addCommas(order.total_price)}원</td>
        <td className="">
          <p>{order.order_date?.split('/')[0]}</p>
          <p>({order.order_date?.split('/')[1]})</p>
        </td>
        <td className="">
          <button onClick={() => clickDeleteOrder(order.cart_id)}>삭제</button>
        </td>
      </tr>
    </tbody>
  );
}

export default OrderCart;
