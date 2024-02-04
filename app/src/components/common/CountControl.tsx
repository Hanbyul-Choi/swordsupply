'use client';
import type {ChangeEvent} from 'react';
import React from 'react';

interface props {
  count: number | string;
  onChangeCount: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickMinus: () => void;
  onClickPlus: () => void;
}

function CountControl({count, onChangeCount, onClickMinus, onClickPlus}: props) {
  return (
    <div className="flex border-[1px] rounded-[6px] w-full justify-around items-center bg-white h-full">
      <button className="w-full text-2xl font-light text-start pl-2" onClick={onClickMinus}>
        -
      </button>
      <input className="w-8 text-center bg-transparent font-light" value={count} onChange={onChangeCount} />
      <button className="w-full text-2xl font-light text-end pr-2" onClick={onClickPlus}>
        +
      </button>
    </div>
  );
}

export default CountControl;
