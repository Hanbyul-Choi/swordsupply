'use client';
import type {ChangeEvent} from 'react';
import React from 'react';

import {Select} from 'antd';
import {FaRegMinusSquare} from 'react-icons/fa';

import type {Option} from './useAddOption';

interface Props {
  options: Option[];
  handleInputChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void;
  handleAddOption: () => void;
  handleRemoveOption: (index: number) => void;
  handleStatusChange: (value: any, index: number) => void;
}

function AddOptions({options, handleInputChange, handleStatusChange, handleAddOption, handleRemoveOption}: Props) {
  return (
    <div className="flex flex-col gap-2 justify-center items-center mt-2">
      {options.map((option, index) => (
        <div className="flex gap-1" key={index}>
          <input
            className="border w-1/4 p-2 ml-2"
            placeholder="옵션명"
            name="option_name"
            value={option.option_name}
            onChange={e => handleInputChange(e, index)}
          />
          <input
            className="border w-1/3 p-2 ml-2"
            placeholder="정가"
            name="origin_price"
            value={option.origin_price}
            onChange={e => handleInputChange(e, index)}
          />
          <input
            className="border w-1/3 p-2 ml-2"
            placeholder="할인가(선택사항)"
            name="event_price"
            value={option.event_price}
            onChange={e => handleInputChange(e, index)}
          />
          <Select
            value={option.status}
            size="small"
            style={{textAlign: 'center', height: '100%', width: '150px'}}
            onChange={value => handleStatusChange(value, index)}
            options={[
              {value: 'available', label: '판매중', filterOption: 'a'},
              {value: 'sold_out', label: '품절', filterOption: 'a'},
              {value: 'comming_soon', label: '입고예정', filterOption: 'a'},
            ]}
          />
          {options.length > 1 && (
            <button type="button" className="p-2 text-xl" onClick={() => handleRemoveOption(index)}>
              <FaRegMinusSquare />
            </button>
          )}
        </div>
      ))}
      <button type="button" className="border-[1px] px-4 p-1 w-fit rounded-md" onClick={handleAddOption}>
        옵션 추가
      </button>
    </div>
  );
}

export default AddOptions;
