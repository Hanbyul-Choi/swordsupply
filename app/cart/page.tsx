'use client';
import React, {useEffect, useState} from 'react';

import {updateCart} from '../src/api/cart';
import {getCartProducts} from '../src/api/products';
import CartCard from '../src/components/cart/cartCard';
import useCartStore from '../src/store/carts.store';
import {changeJson} from '../src/utils/common';

export type idsI = {id: string; count: string; option: string | null};

function Page() {
  const {cart} = useCartStore();
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (cart && cart.cart_list.length > 0 && products.length === 0) {
        const ids = cart.cart_list.map((product: idsI) => product.id);
        if (ids.length > 0) {
          const productData = await getCartProducts(ids);
          setProducts([...products, ...productData]);
        }
      }
      if (cart) {
        updateCart(cart);
      }
    };
    fetchData();
  }, [cart]);

  useEffect(() => {
    let updateTotalPrice = 0;

    if (cart && products.length != 0) {
      changeJson(cart.cart_list)?.forEach(item => {
        // 현재 item에 대한 product의 옵션들
        let targetProduct = products.find(obj => obj.product_id == item.id);
        // 현재 item에 대한 product 정보
        let options = targetProduct?.options;
        // 현재 item에 대한 product 옵션
        let targetOption = options?.find(a => a.option_name == item.option);
        let realPrice = targetOption?.event_price
          ? targetOption?.event_price.replaceAll(',', '')
          : targetOption?.origin_price.replaceAll(',', '');
        let total =
          Number(
            targetProduct?.event_price.replaceAll(',', '') ||
              targetProduct?.origin_price.replaceAll(',', '') ||
              realPrice ||
              0,
          ) * Number(item.count);
        updateTotalPrice += total;
        console.log('targetProduct', targetProduct.event_price, total, item.count);
      });
      setTotalPrice(() => updateTotalPrice);
    }
  }, [products, cart]);

  return (
    <div className="flex flex-col mx-auto max-w-[1080px] p-8 gap-3">
      <h2>쇼핑카트</h2>
      <div className="flex flex-col w-full gap-2">
        {cart?.cart_list?.map((item, i) => (
          <CartCard
            product={products.find(obj => obj.product_id == changeJson(item).id)}
            cart_info={changeJson(item)}
            key={changeJson(item).id + i}
          />
        ))}
      </div>
      <div>
        <h1>{totalPrice}</h1>
      </div>
    </div>
  );
}

export default Page;
