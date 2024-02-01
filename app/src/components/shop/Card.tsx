'use client';
import React, {useState} from 'react';

import {Select} from 'antd';
import Image from 'next/image';
import Link from 'next/link';

import CountControl from '../common/CountControl';
import {useCountControl} from '../common/useCountControl';
import PriceSection from '../PriceSection';

import type {Option} from '../admin/post/useAddOption';
import type {Tables} from '@/app/types/supabase';

function Card({product}: {product: Tables<'products'>}) {
  const {count, onChangeCount, onClickMinus, onClickPlus} = useCountControl();
  const defaulteOption = product?.options !== null ? (product?.options[0] as Option) : null;
  const [curOption, setCurOption] = useState<null | string>(
    defaulteOption !== null ? defaulteOption?.option_name : null,
  );
  const handleChange = (value: string) => {
    setCurOption(value);
  };

  const putInCart = () => {
    const form = {
      product_id: product.product_id,
      option: curOption,
      count,
    };
    return form;
  };
  let statusMsg = '카트에 담기';

  switch (product.status) {
    case 'SoldOut':
      statusMsg = '품절';
      break;

    case 'ComingSoon':
      statusMsg = '입고 예정';
      break;
  }

  return (
    <div className="flex flex-col items-center p-2 gap-2">
      <Link
        href={`/shop/detail/${product.product_id}?brand=${product.brand}`}
        className="flex flex-col items-center gap-2">
        <div className="w-52 h-52 relative">
          <Image src={product.thumbnail ?? ''} alt="" fill sizes="100" style={{objectFit: 'cover'}} />
        </div>
        <p className="border-b-[1px] pb-1 w-full text-center">{product.product_name}</p>
        <PriceSection
          event_price={product.event_price}
          origin_price={product.origin_price}
          options={product.options as Option[]}
          cur_option={curOption}
        />
      </Link>

      <div className="flex gap-2 w-full h-8">
        {product.options?.length !== 0 && product.options && (
          <Select
            defaultValue={defaulteOption?.option_name}
            style={{width: '100%', height: '2rem', textAlign: 'center'}}
            onChange={handleChange}
            options={product.options?.map(option => {
              const newOpt = option as Option;
              return {value: newOpt.option_name, label: newOpt.option_name};
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
      <div className="flex gap-2 w-full">
        <button
          onClick={putInCart}
          className={`w-full bg-black text-white p-2 rounded-md hover:opacity-80 ${
            product.status !== 'Available' && 'bg-slate-500'
          }`}
          disabled={product.status !== 'Available'}>
          {statusMsg}
        </button>
      </div>
    </div>
  );
}

export default Card;
