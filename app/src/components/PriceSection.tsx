import React from 'react';

import {addCommas, findPrice} from '../utils/common';

import type {Option} from './admin/post/useAddOption';

interface Props {
  event_price: string | null;
  origin_price: string | null;
  options: Option[] | null;
  cur_option: string | null;
}

function PriceSection({event_price, options, origin_price, cur_option}: Props) {
  return event_price !== '' || findPrice('event_price', cur_option, options) !== '' ? (
    <div className="flex gap-6">
      <p className="line-through">
        ￦{addCommas(origin_price !== '' ? origin_price! : findPrice('origin_price', cur_option, options))}
      </p>
      <p>￦{addCommas(event_price !== '' ? event_price! : findPrice('event_price', cur_option, options))}</p>
    </div>
  ) : (
    <p className="">
      ￦{addCommas(origin_price !== '' ? origin_price! : findPrice('origin_price', cur_option, options))}
    </p>
  );
}

export default PriceSection;
