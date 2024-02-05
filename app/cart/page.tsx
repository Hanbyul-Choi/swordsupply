'use client';
import React, {useCallback, useEffect, useState} from 'react';

import Link from 'next/link';
import {BarLoader} from 'react-spinners';

import {getCart, updateCart} from '../src/api/cart';
import {getCartProducts} from '../src/api/products';
import CartCard from '../src/components/cart/cartCard';
import Order from '../src/components/cart/order';
import useCartStore from '../src/store/carts.store';
import useSessionStore from '../src/store/session.store';
import {addCommas, changeJson} from '../src/utils/common';

export type idsI = {id: string; count: string; option: string | null};
function Page() {
  const {session} = useSessionStore();
  const {cart, setCart} = useCartStore();
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isNull, setIsNull] = useState(false);
  const [isOrder, setIsOrder] = useState(false);
  const fetchData = useCallback(async () => {
    if (cart && cart.cart_list.length > 0 && products.length === 0) {
      const ids = cart.cart_list.map((product: idsI) => product.id);
      if (ids.length > 0) {
        const productData = await getCartProducts(ids);
        const newIds = productData.map(product => product.product_id);
        const newCartList = changeJson(cart.cart_list).filter(cart => newIds.includes(cart.id));
        setCart({...cart, cart_list: newCartList});
        setProducts(prevProducts => [...prevProducts, ...productData]);
      }
    }
    if (cart) {
      updateCart(cart);
    }
  }, [cart, products]);

  const openOrder = () => {
    setIsOrder(prev => !prev);
  };

  useEffect(() => {
    const fetchCart = async id => {
      const {data, error} = await getCart(id);
      if (data) {
        setCart(data);
      }
      if (error) {
        setIsNull(true);
      }
      setIsLoading(false);
    };
    if (!cart && session) {
      fetchCart(session.user_id);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
  }, [cart, session]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const updateTotals = useCallback(() => {
    let updateTotalPrice = 0;
    let updateTotalCount = 0;

    if (cart && products.length !== 0) {
      changeJson(cart.cart_list)?.forEach(item => {
        const targetProduct = products.find(obj => obj.product_id === item.id);
        const options = targetProduct?.options;
        const targetOption = options?.find(a => a.option_name === item.option);
        const realPrice = targetOption?.event_price
          ? targetOption?.event_price.replaceAll(',', '')
          : targetOption?.origin_price.replaceAll(',', '');
        const total =
          Number(
            targetProduct?.event_price.replaceAll(',', '') ||
              targetProduct?.origin_price.replaceAll(',', '') ||
              realPrice ||
              0,
          ) * Number(item.count);
        updateTotalPrice += total;
        updateTotalCount += Number(item.count);
      });
      setTotalPrice(updateTotalPrice);
      setTotalCount(updateTotalCount);
    }
  }, [cart, products]);

  useEffect(() => {
    updateTotals();
  }, [updateTotals]);

  const removeItem = useCallback(
    (cart_id: string, option: string) => {
      if (window.confirm('해당 상품을 장바구니에서 삭제하시겠습니까?')) {
        const newCartList = changeJson(cart.cart_list).filter(obj => {
          if (obj.id === cart_id) {
            if (!option || option === obj.option) {
              // TODO: 같은 상품의 다른옵션이 있을 경우 데이터는 정상적으로 삭제되나 다른 상품이 삭제됨
              window.location.reload();
              return false;
            }
          }
          return true;
        });
        const newCart = {...cart, cart_list: newCartList};
        setCart(newCart);
      }
    },
    [cart, setCart],
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <BarLoader color="#36d7b7" width={200} height={5} />
      </div>
    );
  }

  if (isNull || cart?.cart_list.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center mt-24 gap-12">
        <p className="text-2xl">현재 쇼핑카트가 비었습니다.</p>
        <div className="w-3/4 bg-slate-400 h-[1px]" />
        <p className="text-xl text-center text-slate-400">SHOP으로 이동 후에 원하시는 상품을 카트에 담아주세요.</p>
        <Link href={'/shop'} className="border-2 p-2 border-black hover:bg-black hover:text-white">
          -{'>'} SHOP으로 이동
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col mx-auto max-w-[1080px] p-8 gap-12">
      <h3 className="w-full text-center text-2xl">나의 쇼핑카트</h3>
      {cart && (
        <>
          <div className="flex flex-col w-full md:w-2/3 mx-auto gap-1 bg-[#ecf0f4] p-2">
            {cart?.cart_list?.map((item, i) => (
              <CartCard
                key={i}
                product={products.find(obj => obj.product_id === changeJson(item).id)}
                cart_info={changeJson(item)}
                removeItem={removeItem}
              />
            ))}
          </div>
          <div className="w-full border-y-2 border-black space-y-2 pb-4">
            <p className="border-b-[1px] py-3">총 주문 상품 {totalCount}개</p>
            <div className="w-full flex justify-center py-4 gap-4">
              <div>
                <p className="text-2xl font-bold">{addCommas(totalPrice)}원</p>
                <p className="text-slate-400 text-center mt-4">상품 금액</p>
              </div>
              <p className="text-lg">+</p>
              <div>
                <p className="text-2xl font-bold">{totalPrice >= 100000 ? '무료' : '3,000원'}</p>
                <p className="text-slate-400 text-center mt-4">배송비</p>
              </div>
              <p className="text-lg">=</p>
              <div>
                <p className="text-2xl font-bold">
                  {addCommas(totalPrice >= 100000 ? totalPrice : totalPrice + 3000)}원
                </p>
                <p className="text-slate-400 text-center mt-4">총 주문금액</p>
              </div>
            </div>
          </div>
          {isOrder && <Order totalPrice={totalPrice} />}
          <button onClick={openOrder} className="mx-auto bg-black text-white text-xl p-2 px-8 hover:opacity-75">
            {isOrder ? '취소하기' : '주문하기'}
          </button>
        </>
      )}
    </div>
  );
}

export default Page;
