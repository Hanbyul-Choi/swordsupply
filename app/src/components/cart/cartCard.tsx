'use client';
import React, {useEffect, useState} from 'react';

import {Select} from 'antd';
import Image from 'next/image';

import {STATUS_MSG} from '../../constants/text';
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
  removeItem: (cart_id: string, option: string) => void;
  changeCheckStatus: (status: boolean) => void;
}

function CartCard({product, cart_info, changeCheckStatus, removeItem}: CardProps) {
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

  if (!product) {
    return;
  }
  return (
    <div className="relative flex justify-between items-center w-full p-4 bg-white">
      <button
        onClick={() => removeItem(cart_info.id, cart_info.option)}
        className="absolute top-2 right-2 border-[1px] border-red-500 px-2 text-red-500">
        삭제
      </button>
      <div className="flex items-center w-full">
        <div className="w-12 h-12 sm:w-20 sm:h-20 relative mr-8" style={{aspectRatio: '1/1'}}>
          <Image src={product.thumbnail ?? ''} alt="" fill sizes="100" style={{objectFit: 'cover'}} />
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center justify-center sm:justify-between w-full">
          <div>
            <p className="">{product.product_name}</p>
            <PriceSection
              event_price={product.event_price}
              origin_price={product.origin_price}
              options={product.options as Option[]}
              cur_option={curOption}
            />
          </div>
          <div className="flex items-center sm:gap-4 sm:pt-6">
            <div className="gap-2 w-full flex mr-2.5 flex-col min-[380px]:flex-row">
              {product.options?.length !== 0 && product.options && (
                <div className="w-full h-8 ">
                  <Select
                    value={curOption}
                    style={{width: '100%', minWidth: '120px', textAlign: 'center', height: '100%'}}
                    onChange={handleChange}
                    options={product.options?.map(option => {
                      const newOpt = option as Option;
                      if (curOption === newOpt.option_name) {
                        if (newOpt.status !== 'available') {
                          changeCheckStatus(false);
                        } else {
                          changeCheckStatus(true);
                        }
                      }
                      return {
                        value: newOpt.option_name,
                        label:
                          newOpt.status === 'available'
                            ? newOpt.option_name
                            : newOpt.option_name + `(${STATUS_MSG[newOpt.status]})`,
                        disabled: newOpt.status !== 'available',
                        filterOption: 'a',
                      };
                    })}
                  />
                </div>
              )}
              <div className="w-full">
                <CountControl
                  count={count}
                  onChangeCount={onChangeCount}
                  onClickMinus={onClickMinus}
                  onClickPlus={onClickPlus}
                />
              </div>
            </div>
            <div className="text-nowrap text-start mt-auto p-2">
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
              원
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartCard;
