import type {ChangeEvent} from 'react';
import {useState} from 'react';

export const useCountControl = (initCount = '1') => {
  const [count, setCount] = useState<string | number>(initCount);

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

  const resetCount = () => {
    setCount(1);
  };
  return {count, onClickMinus, onChangeCount, onClickPlus, resetCount};
};
