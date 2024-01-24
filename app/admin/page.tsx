'use client';
import React from 'react';

import {useQuery, useQueryClient} from '@tanstack/react-query';
import {Dropdown, theme} from 'antd';
import Image from 'next/image';
import {BsThreeDots} from 'react-icons/bs';

import {deletePost, getBrands} from '../src/api/admin';
import {getProductsWithBrand} from '../src/api/products';
import PostModal from '../src/components/admin/postModal';
import {addCommas} from '../src/utils/common';

import type {Option} from '../src/components/admin/post/useAddOption';

const {useToken} = theme;
function Page() {
  const {data: brand} = useQuery({queryKey: ['brands'], queryFn: getBrands});
  // const curBrand = brand?.brands[0];
  const {data} = useQuery({
    queryKey: ['brand1'],
    queryFn: () => getProductsWithBrand('brand1'),
  });
  const queryClient = useQueryClient();

  const deleteProduct = (id: string) => {
    const check = confirm('정말 삭제하시겠습니다?');
    if (check) {
      deletePost(id);
      alert('삭제 완료!');
      queryClient.refetchQueries({queryKey: ['brand1']});
    }
  };

  const {token} = useToken();
  const contentStyle: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  if (!data) {
    return;
  }
  return (
    <div className="bg-[#ecf0f4]">
      <div className="max-w-[1280px] min-h-full flex flex-col justify-center items-center mx-auto p-8">
        <h3 className="text-3xl w-fit mt-10">상품 관리</h3>
        <div className="w-full flex justify-end p-8">
          <PostModal />
        </div>
        <section>
          <table className="bg-white border-[1px] shadow-[0_1px_4px_0_rgba(53,60,73,0.08)]">
            <thead className="w-full">
              <tr className="w-full border-b-[1px]">
                <th className="w-20">No.</th>
                <th className="w-80 text-start px-4 p-2">상품명</th>
                <th className="w-40 text-start">판매가</th>
                <th className="w-32 text-start">상태</th>
              </tr>
            </thead>
            {data.map((product, index) => {
              const {options} = product;
              const optionPrice = options as Option[];
              return (
                <tbody key={index} className="hover:bg-slate-200">
                  <tr>
                    <td className="w-20 text-center">{index + 1}.</td>
                    <td className="w-80 text-start flex gap-2 items-center p-2">
                      <div className="relative w-14 h-14 border-[1px]">
                        <Image
                          src={product.thumbnail ?? '/'}
                          alt={product.product_name ?? '썸네일 이미지'}
                          fill
                          sizes="100"
                          style={{objectFit: 'cover'}}
                        />
                      </div>
                      {product.product_name}
                    </td>
                    <td className="w-40 text-start">
                      {addCommas(
                        product.event_price ||
                          product.origin_price ||
                          optionPrice[0].event_price ||
                          optionPrice[0].origin_price,
                      )}
                      원
                    </td>
                    <td className="w-32 text-start">{product.status}</td>
                    <td className="w-16">
                      <Dropdown
                        trigger={['click']}
                        dropdownRender={() => (
                          <div style={contentStyle} className="flex flex-col overflow-hidden">
                            <button onClick={() => {}} className="p-2 hover:bg-slate-200">
                              수정
                            </button>
                            <button
                              onClick={() => {
                                deleteProduct(product.product_id);
                              }}
                              className="p-2 hover:bg-slate-200">
                              삭제
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
            })}
          </table>
        </section>
      </div>
      <div className="bg-[#ecf0f4] h-[146.5px]" />
    </div>
  );
}

export default Page;
