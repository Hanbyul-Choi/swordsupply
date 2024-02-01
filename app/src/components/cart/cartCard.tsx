'use client';
import React, {useEffect, useState} from 'react';

import {Select} from 'antd';
import Image from 'next/image';

import useCartStore from '../../store/carts.store';
import {addCommas, changeJson, findPrice, isAlreadyCart} from '../../utils/common';
import CountControl from '../common/CountControl';
import {useCountControl} from '../common/useCountControl';
import PriceSection from '../PriceSection';

import type {Option} from '../admin/post/useAddOption';
import type {idsI} from '@/app/cart/page';
import type {Tables} from '@/app/types/supabase';

interface CardProps {
  product: Tables<'products'>;
  cart_info: idsI;
}

function CartCard({product, cart_info}: CardProps) {
  const {count, onChangeCount, onClickMinus, onClickPlus, resetCount} = useCountControl(cart_info?.count);
  const [curOption, setCurOption] = useState<null | string>(cart_info?.option);
  const {cart, setCart} = useCartStore();

  useEffect(() => {
    const originCartList = changeJson([...cart.cart_list]); // [{id:a, count:1},{id:b, count:2}]
    originCartList.map(obj => {
      if (obj.id == product?.product_id && obj.option == cart_info?.option) {
        obj.count = count;
        obj.option = curOption;
      }
    });
    const newCart = {...cart, cart_list: originCartList};
    setCart(newCart);
  }, [count, curOption]);

  const handleChange = (value: string) => {
    //카트에 담겨있는 아이템과 아이디와 옵션이 똑같은 아이템이
    const isAlreadyValue = isAlreadyCart(changeJson(cart.cart_list), cart_info.id, value);
    if (cart && isAlreadyValue) {
      alert('이미 존재합니다');
      return;
    }
    setCurOption(value);
    resetCount();
  };

  // const removeItem = () =>{
  //   if(confirm("해당 상품을 장바구니에서 삭제하시겠습니까?"))

  // }

  if (!product) {
    return;
  }
  return (
    <div className="flex justify-center w-full p-4 bg-gray-400">
      <div>
        <div className="w-40 h-40 relative">
          <Image src={product.thumbnail ?? ''} alt="" fill sizes="100" style={{objectFit: 'cover'}} />
        </div>
        <p className="border-b-[1px] pb-1 w-full text-center">{product.product_name}</p>
        <PriceSection
          event_price={product.event_price}
          origin_price={product.origin_price}
          options={product.options as Option[]}
          cur_option={curOption}
        />
      </div>
      <h1>{count}</h1>
      <h1>{curOption}</h1>
      <div className="flex gap-2 w-full">
        {product.options?.length !== 0 && product.options && (
          <div className="w-48">
            <Select
              value={curOption}
              style={{width: '100%', textAlign: 'center'}}
              onChange={handleChange}
              options={product.options?.map(option => {
                const newOpt = option as Option;
                return {value: newOpt.option_name, label: newOpt.option_name, filterOption: 'a'};
              })}
            />
          </div>
        )}
        <div>
          <CountControl
            count={count}
            onChangeCount={onChangeCount}
            onClickMinus={onClickMinus}
            onClickPlus={onClickPlus}
          />
        </div>
      </div>
      {addCommas(
        Number(
          (
            product.event_price ||
            product.origin_price ||
            findPrice('event_price', curOption, product.options as Option[]) ||
            findPrice('origin_price', curOption, product.options as Option[])
          ).replaceAll(',', ''),
        ) * Number(count),
      )}
      <button onClick={removeItem}>삭제하기</button>
    </div>
  );
}

export default CartCard;
