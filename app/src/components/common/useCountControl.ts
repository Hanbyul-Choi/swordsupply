import type {ChangeEvent} from 'react';
import {useState} from 'react';

export const useCountControl = () => {
  const [count, setCount] = useState<string | number>(1);

  const onClickMinus = () => {
    setCount(prev => {
      if (prev === 1) return 1;
      return Number(prev) - 1;
    });
  };

  const onChangeCount = (e: ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) < 0 || Number(e.target.value) > 99) return;
    return setCount(e.target.value);
  };

  const onClickPlus = () => {
    setCount(prev => {
      if (Number(prev) === 99) return 99;
      return Number(prev) + 1;
    });
  };
  return {count, onClickMinus, onChangeCount, onClickPlus};
};
