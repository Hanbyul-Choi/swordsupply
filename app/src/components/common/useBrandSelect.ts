import type {ChangeEvent, MouseEvent} from 'react';
import {useRef, useState} from 'react';

import {useQueryClient} from '@tanstack/react-query';

import {deleteBrandProduct, updateBrands} from '../../api/admin';

import type {InputRef} from 'antd';

export const useBrandSelect = (brand: string[], defaultBrand?: string) => {
  const queryClient = useQueryClient();
  const [items, setItems] = useState(brand);
  const [selectedBrand, setSelectedBrand] = useState(defaultBrand || '');
  const [name, setName] = useState('');
  const [brandChanged, setBrandChanged] = useState(false);
  const inputRef = useRef<InputRef>(null);

  const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const addItem = async (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    if (items.length > 6) {
      alert('브랜드는 최대 7개까지 등록가능합니다.');
      return;
    }
    if (name === '') {
      alert('추가할 브랜드를 입력하세요');
      return;
    }
    setItems([...items, name]);
    await updateBrands([...items, name]);
    queryClient.refetchQueries({queryKey: ['brands']});
    setBrandChanged;
    setName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleChange = (value: string) => {
    setSelectedBrand(value);
  };

  const deleteItem = async (e: MouseEvent<HTMLElement>, index: number, item: string) => {
    e.stopPropagation();
    e.preventDefault();
    const check = confirm(
      '브랜드를 삭제하게 되면 해당되는 제품들을 볼 수 없게 됩니다. \n관련된 상품이 남아 있는지 확인해주세요.',
    );
    if (check) {
      const updated = [...items];
      updated.splice(index, 1);
      setItems(updated);
      await deleteBrandProduct(item);
      await updateBrands(updated);
      queryClient.refetchQueries({queryKey: ['brands']});
    }
  };
  return {addItem, brandChanged, deleteItem, items, inputRef, onNameChange, name, selectedBrand, handleChange};
};
