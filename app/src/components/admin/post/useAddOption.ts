import type {ChangeEvent} from 'react';
import {useState} from 'react';

import {addCommas} from '@/app/src/utils/common';

export interface Option {
  option_name: string;
  origin_price: string;
  event_price: string;
  status: 'available' | 'sold_out' | 'comming_soon' | string;
}

export function useAddOption(defaultOptions?: Option[]) {
  const [options, setOptions] = useState<Option[]>(
    defaultOptions || [
      {
        option_name: '',
        origin_price: '',
        event_price: '',
        status: 'available',
      },
    ],
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const option_form = {
    option_name: '',
    origin_price: '',
    event_price: '',
    status: 'available',
  };

  const initOptions = () => {
    setOptions([
      {
        option_name: '',
        origin_price: '',
        event_price: '',
        status: 'available',
      },
    ]);
  };

  const handleStatusChange = (value, index) => {
    const newOptions = [...options];
    newOptions[index]['status'] = value;
    setOptions(newOptions);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    let {name, value} = e.target;
    const newOptions = [...options];
    if (name !== 'option_name') {
      value = value.replaceAll(',', '');
      if (isNaN(Number(value))) {
        return;
      }
      if (Number(value) > 9999999) {
        return;
      }
      value = addCommas(Number(value));
    }
    newOptions[index][name as keyof Option] = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, {...option_form}]);
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  return {handleInputChange, handleAddOption, handleRemoveOption, options, initOptions, handleStatusChange};
}
