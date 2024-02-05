import React, {useState} from 'react';

import {useQueryClient} from '@tanstack/react-query';
import {Dropdown, theme} from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import {BsThreeDots} from 'react-icons/bs';
import {GoLinkExternal} from 'react-icons/go';
import {IoIosArrowDown} from 'react-icons/io';

import EditForm from './form/editForm';
import {updateBestSeller, updateProductStatus} from '../../api/admin';
import {addCommas} from '../../utils/common';
import {useModal} from '../overlay/modal/useModal';

import type {Option} from './post/useAddOption';
import type {Tables} from '@/app/types/supabase';
import type {DropdownProps} from 'antd';

const {useToken} = theme;

function ListCard({product, index}: {product: Tables<'products'>; index: number}) {
  const {token} = useToken();
  const [statusOpen, setStatusOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);

  const contentStyle: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  const {mount} = useModal();
  const {options} = product;
  const optionPrice = options as Option[];
  const [status, setStatus] = useState(product.status);

  const queryClient = useQueryClient();
  const deleteProduct = async (id: string, brand: string) => {
    const check = confirm('정말 삭제하시겠습니다?');
    if (check) {
      await updateProductStatus(id, 'disabled');
      queryClient.refetchQueries({queryKey: [brand]});
      alert('삭제 완료!');
    }
  };

  let statusMsg = '판매중';

  switch (status) {
    case 'SoldOut':
      statusMsg = '품절';
      break;

    case 'ComingSoon':
      statusMsg = '입고 예정';
      break;
  }

  const clickStatusHandler = (status: string) => {
    if (confirm('판매 상태를 변경하시겠습니까?')) {
      setStatus(status);
      updateProductStatus(product.product_id, status);
      alert('상태가 변경되었습니다.');
    }
    return setStatusOpen(false);
  };

  const handleOpenChangeStatus: DropdownProps['onOpenChange'] = (nextOpen, info) => {
    if (info.source === 'trigger' || nextOpen) {
      setStatusOpen(nextOpen);
    }
  };

  const handleOpenUpdate: DropdownProps['onOpenChange'] = (nextOpen, info) => {
    if (info.source === 'trigger' || nextOpen) {
      setUpdateOpen(nextOpen);
    }
  };

  return (
    <tbody key={index} className="hover:bg-slate-200">
      <tr>
        <td className="w-20 text-center">{index + 1}.</td>
        <td className="w-96 text-start flex gap-2 items-center p-2">
          <div className="relative w-14 h-14 border-[1px]">
            <Image
              src={product.thumbnail ?? '/'}
              alt={product.product_name ?? '썸네일 이미지'}
              fill
              sizes="100"
              style={{objectFit: 'cover'}}
            />
          </div>
          <Link href={`/shop/detail/${product.product_id}?brand=${product.brand}`} className="flex gap-1">
            {product.product_name}
            <div className={`bg-[#fe5356] text-white px-2 rounded-sm ${product.best_seller || 'hidden'}`}>BEST</div>
            <div className="text-slate-400">
              <GoLinkExternal />
            </div>
          </Link>
        </td>
        <td className="w-40 text-center">
          {addCommas(
            product.event_price || product.origin_price || optionPrice[0].event_price || optionPrice[0].origin_price,
          )}
          원
        </td>
        <td className="w-28 text-start">
          <Dropdown
            trigger={['click']}
            open={statusOpen}
            onOpenChange={handleOpenChangeStatus}
            dropdownRender={() => (
              <div style={contentStyle} className="flex flex-col overflow-hidden">
                <button onClick={() => clickStatusHandler('Available')} className="p-2 hover:bg-slate-200">
                  판매중
                </button>
                <button onClick={() => clickStatusHandler('SoldOut')} className="p-2 hover:bg-slate-200">
                  품절
                </button>
                <button onClick={() => clickStatusHandler('ComingSoon')} className="p-2 hover:bg-slate-200">
                  입고예정
                </button>
              </div>
            )}>
            <button className="p-4 flex justify-between items-center gap-2 w-full" onClick={e => e.preventDefault()}>
              <p>{statusMsg}</p>
              <div>
                <IoIosArrowDown />
              </div>
            </button>
          </Dropdown>
        </td>
        <td className="w-fit text-center text-nowrap">
          <p> {product.created_at.split('T')[0]}</p>
        </td>

        <td className="w-24 text-center">
          <Dropdown
            trigger={['click']}
            open={updateOpen}
            onOpenChange={handleOpenUpdate}
            dropdownRender={() => (
              <div style={contentStyle} className="flex flex-col overflow-hidden">
                <button
                  onClick={() => {
                    setUpdateOpen(false);
                    mount('EditModal', <EditForm product={product} />);
                  }}
                  className="p-2 hover:bg-slate-200">
                  수정
                </button>
                <button
                  onClick={() => {
                    setUpdateOpen(false);
                    deleteProduct(product.product_id, product.brand);
                  }}
                  className="p-2 hover:bg-slate-200">
                  삭제
                </button>
                <button
                  onClick={async () => {
                    await updateBestSeller(product.product_id, !product.best_seller);
                    setUpdateOpen(false);
                    queryClient.refetchQueries({queryKey: [product.brand]});
                  }}
                  className="p-2 hover:bg-slate-200 flex gap-2">
                  <div className={`bg-[#fe5356] text-white px-2 rounded-sm `}>BEST</div>
                  {product.best_seller ? '해제' : '등록'}
                </button>
              </div>
            )}>
            <button className="px-8 p-4" onClick={e => e.preventDefault()}>
              <BsThreeDots />
            </button>
          </Dropdown>
        </td>
      </tr>
    </tbody>
  );
}

export default ListCard;
