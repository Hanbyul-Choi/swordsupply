'use client';
import type {ChangeEvent} from 'react';
import React, {useState} from 'react';

import {Select} from 'antd';
import Link from 'next/link';

import {addCommas} from '../utils/common';

interface CardProps {
  productName: string;
  options: string[];
  eventPrice: number;
  originPrice: number;
  thumbnail: string;
  product_id: string;
}

function Card({productName, options = [], eventPrice, originPrice, thumbnail, product_id}: CardProps) {
  const [count, setCount] = useState<string | number>(1);
  const [size, setSize] = useState<null | string>(null);

  const handleChange = (value: string) => {
    setSize(value);
  };

  const onClickMinus = () => {
    setCount(prev => {
      if (prev === 1) return 1;
      return Number(prev) - 1;
    });
  };

  const onChangeCount = (e: ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) < 0 || Number(e.target.value) > 99) return;
    return setCount(e.target.value);
  };

  const onClickPlus = () => {
    setCount(prev => {
      if (Number(prev) === 99) return 99;
      return Number(prev) + 1;
    });
  };

  const putInCart = () => {
    const form = {
      size,
      count,
    };
    return form;
  };

  return (
    <div className="flex flex-col items-center p-2 gap-2">
      <Link href={`/products/${product_id}`} className="flex flex-col items-center gap-2">
        {/* <Image src={'/'} alt="" width={0} height={0} sizes="100" style={{width: '100%'}} /> */}
        {/* <div className="w-60 h-60 bg-slate-800" /> */}
        <div className="w-60 h-60">
          <img src={thumbnail} alt="예시이미지" />
        </div>
        <p className="border-b-[1px] pb-1 w-full text-center">{productName}</p>
        <div className="flex gap-6">
          <p className="line-through">￦{addCommas(originPrice)}</p>
          <p>￦{addCommas(eventPrice)}</p>
        </div>
      </Link>

      <div className="flex gap-2 w-full">
        {options?.length !== 0 && (
          <Select
            defaultValue={'8oz'}
            style={{width: '100%'}}
            onChange={handleChange}
            options={options.map(option => {
              return {value: option, label: option};
            })}
          />
        )}

        {/* 개수 설정 부분 */}
        <div className="flex gap-2 border-[1px] rounded-md w-full justify-around items-center">
          <button className="w-full text-2xl font-light text-start pl-2" onClick={onClickMinus}>
            -
          </button>
          <input className="w-8 text-center" value={count} onChange={onChangeCount} />
          <button className="w-full text-2xl font-light text-end pr-2" onClick={onClickPlus}>
            +
          </button>
        </div>
      </div>

      <button onClick={putInCart} className="w-full bg-black text-white p-2 rounded-md">
        카트에 담기
      </button>
    </div>
  );
}

export default Card;
