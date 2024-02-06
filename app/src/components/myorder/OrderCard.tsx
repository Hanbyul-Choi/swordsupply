'use client';
import React, {useState} from 'react';

import {addCommas} from '../../utils/common';

export default function OrderCard({data}) {
  const {cart_list, order_date, total_price} = data;
  const [isDetail, setIsDetail] = useState(false);

  return (
    <div className="w-full flex flex-col gap-4 border border-black p-4">
      <div className="flex justify-between border-b p-2">
        <p>{order_date.split('/')[0]}</p>
        <button onClick={() => setIsDetail(!isDetail)}>{isDetail ? '닫기' : '주문상세보기'}</button>
      </div>
      <div className="p-2">
        <p>
          <strong>{cart_list[0].product_name}</strong>
          {cart_list.length > 1 && <span> 외 {cart_list.length - 1}종</span>}
        </p>
        <p className="text-end">{addCommas(total_price)}원</p>
      </div>
      {isDetail && (
        <div className="border-t flex flex-col gap-2">
          <div className="flex p-2">
            <p className="font-bold">주문일시 </p>
            <p> : {order_date.replace('/', ' ')}</p>
          </div>
          <div className="border-b p-2">
            <p className="mb-2 font-bold">주문상품목록</p>
            {cart_list.map(item => (
              <div className="flex gap-3 justify-between text-start" key={item.id}>
                <p className="min-w-24">{item.product_name}</p>
                {item.option ? <p className="min-w-20">옵션:{item.option}</p> : ''}
                <p className="min-w-16 text-end">{item.count}개</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-end w-full">
            <div>
              <div className="flex justify-between">
                <p className="font-bold">상품금액 : </p>
                <p> {total_price < 103001 ? `${addCommas(total_price - 3000)}원` : `${addCommas(total_price)}원`}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-bold">배송비 : </p> <p> {total_price < 103001 ? ' 3,000원' : ' 무료'}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-bold">총 주문금액 : </p> <p>{addCommas(total_price)}원</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
