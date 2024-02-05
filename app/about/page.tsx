import React from 'react';

import Image from 'next/image';

function Page() {
  return (
    <>
      <div className="bg-[url('/bannerBg.png')] w-full h-80 flex items-center justify-center">
        <div className="flex items-center justify-between max-w-[1280px] gap-8 sm:gap-24 p-4">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-32 h-32">
              <Image alt="logo" src="/favicon.png" sizes="100" fill />
            </div>
            <p className="text-2xl font-extrabold text-white text-center">SWORD SUPPLY</p>
          </div>
          <div className="flex flex-col gap-2 text-white text-xl sm:text-2xl break-keep">
            <p> 합리적이고 가성비적인 가격, </p>
            <p> 최고의 품질,</p>
            <p>그리고 신뢰 및 존중</p>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center gap-10 mt-16 text-xl p-4 break-keep text-center">
        <p>저희 서플라이에서는 단순한 판매가 아닌 모든 타투이스트를 위한 편의성을 추구합니다.</p>
        <p>타투아티스트들의 예술성을 높이고 고품질적인 제품 제공에 초점을 맞추고 있습니다.</p>
        <a
          target="_blank"
          href="https://prfl.link/@sword"
          className="border p-2 rounded-md bg-black text-white hover:opacity-75">
          문의하기 →
        </a>
      </div>
    </>
  );
}

export default Page;
