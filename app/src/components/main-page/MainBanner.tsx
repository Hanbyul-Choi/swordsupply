import React from 'react';

import {Carousel} from 'antd';
import Image from 'next/image';
import Link from 'next/link';

function MainBanner() {
  // const contentStyle: React.CSSProperties = {
  //   height: '160px',
  //   color: '#fff',
  //   textAlign: 'center',
  //   background: 'rgba(',
  // };
  const contentCss = `bg-[rgba(0,0,0,0.7)] h-60`;
  return (
    <div className="w-full h-[90vh] flex flex-col">
      <Image src={'/main_banner.png'} fill style={{width: '100%', objectFit: 'cover'}} alt="메인 배너" />
      <div className="bg-black opacity-20 absolute w-full h-screen top-0 left-0" />
      <div className="absolute w-full sm:w-[40rem] p-2 top-0 left-1/2 -translate-x-1/2 sm:left-1/4 sm:-translate-x-1/3 flex flex-col items-start mt-[30vh] ">
        <div className="flex flex-col w-full gap-8 text-white text-nowrap p-14 bg-[rgba(0,0,0,0.5)] shadow-[1px_4px_7px_0_rgba(0,0,0,0.02)]">
          <p className="text-3xl sm:text-4xl font-anton">SWORDSUPPLY</p>
          <p className="text-2xl sm:text-3xl mt-10">
            <span className="text-amber-300 font-semibold">합리적</span>이고{' '}
            <span className="text-amber-300 font-semibold">가성비</span>적인 가격
          </p>
          <p className="text-2xl sm:text-3xl">
            <span className="text-amber-300 font-semibold">최고</span>의 품질
          </p>
          <div className="w-full flex justify-end">
            <Link href={'/shop'} className="text-white border-2 border-white px-4 p-2 hover:bg-white hover:text-black">
              -{'>'} SHOP NOW
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute w-full bottom-0">
        <Carousel>
          <div className="w-full h-full relative">
            <Image
              src="/bannerImgs/오픈이벤트배너.JPG"
              alt="이벤트배너"
              width={0}
              height={0}
              sizes="100"
              style={{objectFit: 'cover'}}
              className="absolute"
            />
          </div>
          <div>
            <h3 className={contentCss}>2</h3>
          </div>
        </Carousel>
      </div>
    </div>
  );
}

{
  /* <div className="mt-2 p-1 bg-[#FFEB3B] rounded-lg w-12 h-12">
  <Image src={'/kakao.svg'} width={0} height={0} sizes="100" style={{width: '100%'}} alt={`kakao login`} />
</div>; */
}

{
  /* <div className="w-full h-[90vh] flex flex-col p-2">
<Image src={'/main_banner.png'} fill style={{width: '100%', objectFit: 'cover'}} alt="메인 배너" />
<div className="bg-black opacity-20 absolute w-full h-screen top-0 left-0" />
<div className="absolute w-full sm:w-[40rem] p-2 top-0 left-1/2 -translate-x-1/2 sm:left-1/4 sm:-translate-x-1/3 flex flex-col items-start mt-[30vh] ">
  <div className="flex flex-col w-full gap-8 text-white text-nowrap p-14 bg-[rgba(0,0,0,0.5)] shadow-[1px_4px_7px_0_rgba(0,0,0,0.02)]">
    <p className="text-3xl sm:text-4xl font-anton">SWORDSUPPLY</p>
    <p className="text-2xl sm:text-3xl mt-10">
      <span className="text-amber-300 font-semibold">합리적</span>이고{' '}
      <span className="text-amber-300 font-semibold">가성비</span>적인 가격
    </p>
    <p className="text-2xl sm:text-3xl">
      <span className="text-amber-300 font-semibold">최고</span>의 품질
    </p>
    <div className="w-full flex justify-end">
      <Link href={'/shop'} className="text-white border-2 border-white px-4 p-2 hover:bg-white hover:text-black">
        -{'>'} SHOP NOW
      </Link>
    </div>
  </div>
</div>

</div> */
}
export default MainBanner;
