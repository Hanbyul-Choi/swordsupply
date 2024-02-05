import React from 'react';

import Image from 'next/image';

function Page() {
  return (
    <>
      <div className="bg-slate-400 w-full h-40 flex items-center justify-center gap-10">
        <div className="relative w-28 h-28">
          <Image alt="logo" src="/favicon.png" sizes="100" fill></Image>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-lg">합리적이고 가성비적인 가격, 최고의 품질,신뢰 및 존중</p>
          <p className="text-2xl font-extrabold">SWORD SUPPLY</p>
        </div>
      </div>
      <div className="w-full flex flex-col items-center gap-10 mt-10 text-2xl">
        <p>저희 서플라이에서는 단순한 판매가 아닌 모든 타투이스트를 위한 편의성을 추구합니다.</p>
        <p>타투아티스트들의 예술성을 높이고 고품질적인 제품 제공에 초점을 맞추고 있습니다.</p>
        <a target="_blank" href="https://prfl.link/@sword" className="border p-3 rounded-md hover:bg-amber-200">
          문의하기 →
        </a>
      </div>
    </>
  );
}

export default Page;
