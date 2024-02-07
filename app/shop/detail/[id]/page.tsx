'use client';
import React, {useEffect, useState} from 'react';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {Breadcrumb, Select} from 'antd';
import Link from 'next/link';
import {BarLoader} from 'react-spinners';

import {getCart, postCart, updateCart} from '@/app/src/api/cart';
import {getProductsWithBrand} from '@/app/src/api/products';
import CountControl from '@/app/src/components/common/CountControl';
import {useCountControl} from '@/app/src/components/common/useCountControl';
import PriceSection from '@/app/src/components/PriceSection';
import useCartStore from '@/app/src/store/carts.store';
import useSessionStore from '@/app/src/store/session.store';
import {addCommas, changeJson, findPrice, isAlreadyCart} from '@/app/src/utils/common';

import type {Option} from '@/app/src/components/admin/post/useAddOption';
import type {Tables} from '@/app/types/supabase';

function Page({params: {id}, searchParams: {brand}}: {params: {id: string}; searchParams: {brand: string}}) {
  const queryClient = useQueryClient();
  const {cart, setCart} = useCartStore();
  const {session} = useSessionStore();
  const {count, onChangeCount, onClickMinus, onClickPlus, resetCount} = useCountControl();
  const cacheData: any = queryClient.getQueryData([brand]);
  const {data, isLoading} = useQuery({queryKey: [brand, 'detail'], queryFn: () => getProductsWithBrand(brand)});

  let productsData: Tables<'products'>[] = cacheData?.pages?.map((pageData: any) => pageData.data).flat() || [];
  if (productsData.length === 0) {
    productsData = data || [];
  }

  const product = productsData?.find(product => product.product_id === id);

  const defaulteOption = product?.options !== null ? (product?.options[0] as Option) : null;
  const [curOption, setCurOption] = useState<null | string>(
    defaulteOption !== null ? defaulteOption?.option_name : null,
  );

  useEffect(() => {
    setCurOption(defaulteOption !== null ? defaulteOption?.option_name : null);
  }, [defaulteOption]);

  const handleChange = (value: string) => {
    setCurOption(value);
    resetCount();
  };

  const putInCart = async () => {
    if (!session) {
      return alert('로그인이 필요합니다.');
    }
    const {user_id} = session;
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
    if (!cart) {
      await postCart({user_id, cart_list: [form]});
      const {data} = await getCart(user_id);
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

  if (isLoading) {
    return (
      <div className="w-full mx-auto flex justify-center mt-96">
        <BarLoader color="#36d7b7" width={200} height={5} />
      </div>
    );
  }

  if (!product) {
    return <div className="flex justify-center items-center mt-96 text-2xl">해당 제품이 존재하지 않습니다.</div>;
  }

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
    <div className="mt-4 max-w-[1080px] mx-auto flex flex-col items-center p-8">
      <div className="w-full mb-12">
        <Breadcrumb
          items={[
            {
              title: <Link href="/">HOME</Link>,
            },
            {
              title: <a href="/shop">SHOP</a>,
            },
            {
              title: <a href={`/shop?brand=${product.brand}`}>{product.brand.toUpperCase()}</a>,
            },
            {
              title: `${product.product_name}`,
            },
          ]}
        />
      </div>
      <div className="flex flex-col justify-center gap-8 w-full md:flex-row">
        <div className="w-full md:w-1/2 p-4">
          <img src={product.thumbnail} alt="제품 사진" style={{width: '100%', objectFit: 'cover'}} />
        </div>
        <article className="space-y-8 w-full md:w-1/2">
          <div className="border-b-2 pb-3 space-y-2">
            <h3 className="text-2xl">{product.product_name}</h3>
            <PriceSection
              event_price={product.event_price}
              origin_price={product.origin_price}
              options={product.options as Option[]}
              cur_option={curOption}
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-semibold">배송비</span> 3,000원 (100,000원 이상 구매 시 무료배송)
            </p>
          </div>
          <div className="bg-[#f9f9f9] p-4">
            {product.options?.length !== 0 && (
              <>
                <p className="w-full border-b-2 pb-2">옵션</p>
                <div className="w-1/2 mt-2">
                  <Select
                    defaultValue={defaulteOption?.option_name}
                    style={{width: '100%', height: '2rem', textAlign: 'center'}}
                    onChange={handleChange}
                    options={product.options?.map(option => {
                      const newOpt = option as Option;
                      return {value: newOpt.option_name, label: newOpt.option_name};
                    })}
                  />
                </div>
              </>
            )}
            <p className="w-full border-b-2 pb-2 mt-4 ">수량</p>
            <div className="w-full mt-2 flex justify-between items-center">
              <div className="w-1/2 bg-white">
                <CountControl
                  count={count}
                  onChangeCount={onChangeCount}
                  onClickMinus={onClickMinus}
                  onClickPlus={onClickPlus}
                />
              </div>
              <p className="text-center">
                ￦
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
              </p>
            </div>
          </div>
          <div className="flex justify-between">
            <p>총 상품 금액({count}개)</p>
            <p className="text-xl px-2">
              ￦
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
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={putInCart}
              className={`w-1/2 ml-auto bg-black text-white p-2 rounded-md hover:opacity-80 ${
                product.status !== 'available' && 'bg-slate-500'
              }`}
              disabled={product.status !== 'available'}>
              {statusMsg}
            </button>
          </div>
          <div>
            <p>환불정책</p>
            <p className="text-sm text-slate-500 mt-2">모든 제품은 출고 시 반품 및 교환이 불가합니다.</p>
          </div>
        </article>
      </div>
      <div className="mt-20 p-4 text-center w-full border-t-2">
        <h3 className="text-lg my-10">제품설명</h3>
        <p className="p-3">
          {product.description.split('\n').map((text, i) => (
            <React.Fragment key={i}>
              {text}
              <br />
            </React.Fragment>
          ))}
        </p>
        <div className="p-12 sm:w-2/3 space-y-10 mx-auto">
          {product.images?.map((img, i) => {
            return (
              <div key={i}>
                <img src={img} alt="제품 사진" style={{width: '100%', objectFit: 'cover'}} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Page;
