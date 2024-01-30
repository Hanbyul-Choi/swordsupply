'use client';
import type {ChangeEvent, MouseEvent, Ref} from 'react';
import React from 'react';

import {PlusOutlined} from '@ant-design/icons';
import {Button, Divider, Input, Select, Space} from 'antd';

import type {InputRef} from 'antd';

const {Option} = Select;

interface Props {
  addItem: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  deleteItem: (e: MouseEvent<HTMLElement>, index: number) => void;
  onNameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleChange: (value: string) => void;
  name: string;
  inputRef: Ref<InputRef>;
  items: string[];
}

const BrandSelect = ({brandProps, curOpt}: {brandProps: Props; curOpt?: string}) => {
  const {onNameChange, inputRef, name, addItem, items, deleteItem, handleChange} = brandProps;
  return (
    <Select
      style={{width: '100%', color: '#9ca3af'}}
      placeholder="선택"
      defaultValue={curOpt}
      onChange={handleChange}
      dropdownRender={menu => {
        return (
          <>
            {menu}
            <Divider style={{margin: '8px 0'}} />
            <Space style={{padding: '0 8px 4px'}}>
              <Input
                placeholder="브랜드 입력"
                ref={inputRef}
                value={name}
                onChange={onNameChange}
                onKeyDown={e => e.stopPropagation()}
              />
              <Button type="text" icon={<PlusOutlined />} onClick={addItem} className="text-sm">
                브랜드 추가하기
              </Button>
            </Space>
          </>
        );
      }}>
      {items.map((item, index) => (
        <Option key={item}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <div>{item}</div>
            <Button onClick={e => deleteItem(e, index)} danger size="small">
              삭제
            </Button>
          </div>
        </Option>
      ))}
    </Select>
  );
};

export default BrandSelect;
