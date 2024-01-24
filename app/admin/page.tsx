'use client';
import React from 'react';

import {useQuery} from '@tanstack/react-query';

import {getBrands} from '../src/api/admin';
import PostModal from '../src/components/admin/postModal';

function Page() {
  // 상품 추가 폼에서 브랜드가 로드 되지 않는 문제로 어드민 페이지 에서 미리 데이터 get
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {data: brand} = useQuery({queryKey: ['brands'], queryFn: getBrands});
  return (
    <div className="max-w-[1280px] flex flex-col justify-center items-center mt-52">
      <h3 className="text-3xl">관리자 페이지</h3>
      <div className="w-full flex justify-end p-8">
        <PostModal />
      </div>
    </div>
  );
}

export default Page;
