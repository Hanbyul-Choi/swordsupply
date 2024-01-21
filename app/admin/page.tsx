'use client';
import React from 'react';

import PostModal from '../src/components/admin/postModal';

function Page() {
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
