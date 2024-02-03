import React from 'react';

import {changeJson} from '../../utils/common';

import type {Tables} from '@/app/types/supabase';

async function OrderCart({order, index}: {order: Tables<'carts'> & {users: Tables<'users'>}; index: number}) {
  const {users} = order;
  return (
    <tbody className="border-b text-center">
      <tr>
        <td className="">{index + 1}.</td>
        <td>{users.user_name}</td>
        <td>
          {order.cart_list.map((product, i) => (
            <div className="flex font-normal" key={i}>
              <p className="w-1/2">{changeJson(product).product_name}</p>
              <p className="w-1/4">{changeJson(product).option || '-'}</p>
              <p className="w-1/4">{changeJson(product).count}</p>
            </div>
          ))}
        </td>
        <td className="">{order.total_price}</td>
        <td className="">{users.phone}</td>
        <td className="">{order.order_date}</td>
      </tr>
    </tbody>
  );
}

export default OrderCart;
