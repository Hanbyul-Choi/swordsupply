'use client';
import React, {useState} from 'react';

import {Select} from 'antd';
import Image from 'next/image';
import Link from 'next/link';

import {getCart, postCart, updateCart} from '../../api/cart';
import {STATUS_MSG} from '../../constants/text';
import useCartStore from '../../store/carts.store';
import useSessionStore from '../../store/session.store';
import {changeJson, isAlreadyCart} from '../../utils/common';
import CountControl from '../common/CountControl';
import {useCountControl} from '../common/useCountControl';
import PriceSection from '../PriceSection';

import type {Option} from '../admin/post/useAddOption';
import type {Tables} from '@/app/types/supabase';

function Card({product}: {product: Tables<'products'>}) {
  const {cart, setCart} = useCartStore();
  const {session} = useSessionStore();
  const {count, onChangeCount, onClickMinus, onClickPlus} = useCountControl();
  const defaulteOption = product?.options !== null ? (product?.options[0] as Option) : null;
  const [curOption, setCurOption] = useState<null | string>(
    defaulteOption !== null ? defaulteOption?.option_name : null,
  );
  const handleChange = (value: string) => {
    setCurOption(value);
  };

  const putInCart = async () => {
    if (!session) {
      return alert('로그인이 필요합니다.');
    }
    if (isAlreadyCart(changeJson(cart?.cart_list), product.product_id, curOption)) {
      alert('이미 카트에 담겨있습니다.');
      return;
    }

    const form = {
      id: product.product_id,
      product_name: product.product_name,
      count,
      option: curOption,
    };

    const curOptionStatus = (product.options as Option[]).find(option => option.option_name === curOption).status;
    //선택된 옵션 상태가 available이 아닌 것은 얼리리턴으로 예외처리
    if (curOptionStatus !== 'available') {
      return alert(`현재 ${STATUS_MSG[curOptionStatus]}인 상품입니다. `);
    }
    if (!cart) {
      await postCart({user_id: session.user_id, cart_list: [form]});
      const {data} = await getCart(session.user_id);
      setCart(data);
    } else {
      const newCart = {...cart};
      newCart.cart_list.push(form);
      setCart(newCart);
      updateCart(newCart);
    }

    alert('카트에 담겼습니다!');
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
          <div
            className={`bg-[#fe5356] text-white absolute top-2 left-2 px-2 rounded-sm ${
              product.best_seller || 'hidden'
            }`}>
            BEST
          </div>
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
              return {
                value: newOpt.option_name,
                label:
                  newOpt.status === 'available'
                    ? newOpt.option_name
                    : newOpt.option_name + `(${STATUS_MSG[newOpt.status]})`,
                disabled: newOpt.status !== 'available',
              };
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
            product.status !== 'available' && 'bg-slate-500'
          }`}
          disabled={product.status !== 'available'}>
          {statusMsg}
        </button>
      </div>
    </div>
  );
}

export default Card;
