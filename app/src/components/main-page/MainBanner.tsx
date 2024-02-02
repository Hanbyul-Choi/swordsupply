import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

function MainBanner() {
  return (
    <div className="w-full h-[90vh] flex flex-col p-2">
      <Image src={'/main_banner.png'} fill style={{width: '100%', objectFit: 'cover'}} alt="메인 배너" />
      <div className="bg-black opacity-20 absolute w-full h-screen top-0 left-0" />
      <div className="absolute w-[40rem] p-2 top-0 left-1/2 sm:left-1/4 -translate-x-1/3 flex flex-col items-start mt-[30vh] ">
        <div className="flex flex-col w-full gap-8 text-white text-nowrap p-14 bg-[rgba(0,0,0,0.5)] shadow-[1px_4px_7px_0_rgba(0,0,0,0.02)]">
          <p className="text-4xl font-anton">SWORDSUPPLY</p>
          <p className="text-3xl mt-10">
            <span className="text-amber-300 font-semibold">합리적</span>이고{' '}
            <span className="text-amber-300 font-semibold">가성비</span>적인 가격
          </p>
          <p className="text-3xl">
            <span className="text-amber-300 font-semibold">최고</span>의 품질
          </p>
          <div className="w-full flex justify-end">
            <Link href={'/shop'} className="text-white border-2 border-white px-4 p-2 hover:bg-white hover:text-black">
              -{'>'} SHOP NOW
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainBanner;
