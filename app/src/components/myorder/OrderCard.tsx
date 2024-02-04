'use client';
import React, {useEffect, useState} from 'react';

export default function OrderCard({data}) {
  const {cart_list, order_date, total_price} = data;
  const [isDetail, setIsDetail] = useState(false);
  useEffect(() => {});
  const totalCount = cart_list.reduce((acc, cur) => {
    return acc + Number(cur.count);
  }, 0);
  return (
    <div className="w-96 flex flex-col gap-2 bg-slate-400">
      <div className="flex justify-between border">
        <p>{order_date.split('/')[0]}</p>
        <button onClick={() => setIsDetail(!isDetail)}>{isDetail ? '닫기' : '주문상세보기'}</button>
      </div>
      <p>{totalCount == 1 ? cart_list[0].product_name : `${cart_list[0].product_name}외 ${totalCount - 1}개`}</p>
      <p>{total_price}원</p>
      {isDetail && (
        <div className="border-t-2 flex flex-col gap-2">
          <p>주문일시 : {order_date}</p>
          <div className="border">
            <p className="mb-2">주문상품목록</p>
            {cart_list.map(item => (
              <div className="flex gap-3" key={item.id}>
                <p className="w-[20%]">{item.product_name}</p>
                {item.option ? <p className="w-[20%]">사이즈:{item.option}</p> : ''}
                <p className="w-[20%]">{item.count}개</p>
              </div>
            ))}
          </div>
          <p>상품금액: {total_price < 103001 ? total_price - 3000 : total_price}</p>
          <p>배송비 : {total_price < 103001 ? '3000원' : '무료'}</p>
          <p>총 주문금액 : {total_price}</p>
        </div>
      )}
    </div>
  );
}
