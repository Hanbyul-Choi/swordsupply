'use client';
import React, {useState} from 'react';

import {Select} from 'antd';
import Link from 'next/link';

import CountControl from './common/CountControl';
import {useCountControl} from './common/useCountControl';
import {addCommas} from '../utils/common';

interface CardProps {
  product_name: string;
  options: string[];
  eventPrice: number | null;
  originPrice: number;
  thumbnail: string;
  product_id: string;
}

function Card({product_name, options = [], eventPrice, originPrice, thumbnail, product_id}: CardProps) {
  const {count, onChangeCount, onClickMinus, onClickPlus} = useCountControl();
  const [size, setSize] = useState<null | string>(null);
  const handleChange = (value: string) => {
    setSize(value);
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
      <Link href={`/products/detail/${product_id}`} className="flex flex-col items-center gap-2">
        {/* <Image src={'/'} alt="" width={0} height={0} sizes="100" style={{width: '100%'}} /> */}
        {/* <div className="w-60 h-60 bg-slate-800" /> */}
        <div className="w-60 h-60">
          <img src={thumbnail} alt="예시이미지" />
        </div>
        <p className="border-b-[1px] pb-1 w-full text-center">{product_name}</p>
        {eventPrice ? (
          <div className="flex gap-6">
            <p className="line-through">￦{addCommas(originPrice)}</p>
            <p>￦{addCommas(eventPrice)}</p>
          </div>
        ) : (
          <p className="">￦{addCommas(originPrice)}</p>
        )}
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
        <CountControl
          count={count}
          onChangeCount={onChangeCount}
          onClickMinus={onClickMinus}
          onClickPlus={onClickPlus}
        />
      </div>

      <button onClick={putInCart} className="w-full bg-black text-white p-2 rounded-md">
        카트에 담기
      </button>
    </div>
  );
}

export default Card;
