import React from 'react';

import {Carousel} from 'antd';
import Link from 'next/link';

function MainBanner() {
  return (
    <div className="w-full h-[80vh] flex flex-col justify-center">
      <div className="bg-[url('/main_banner.png')] bg-cover w-full h-[100vh] absolute top-0" />
      <div className="w-full mx-auto ">
        <Carousel autoplay autoplaySpeed={6000}>
          <div className="flex justify-center items-center w-full p-5 pb-7 bg-[rgba(0,0,0,0.5)] shadow-[1px_4px_7px_0_rgba(0,0,0,0.02)]">
            <div className="bg-[url('/bannerImgs/메인이벤트1.jpg')] h-[35vh] md:h-[50vh] bg-center bg-contain bg-no-repeat w-full" />
          </div>
          <div className="flex justify-center items-center w-full p-5 pb-7 bg-[rgba(0,0,0,0.5)] shadow-[1px_4px_7px_0_rgba(0,0,0,0.02)]">
            <div className="bg-[url('/bannerImgs/메인이벤트2.jpg')] h-[35vh] md:h-[50vh] bg-center bg-contain bg-no-repeat" />
          </div>
          <div className="flex flex-col items-start ">
            <div className="flex flex-col gap-8 text-white text-nowrap p-5 pb-7 bg-[rgba(0,0,0,0.5)] shadow-[1px_4px_7px_0_rgba(0,0,0,0.02)]">
              <div className="h-[35vh] md:h-[50vh] p-4 md:px-14 flex flex-col justify-center gap-4 mx-auto w-full max-w-[700px]">
                <p className="text-3xl sm:text-4xl font-anton">SWORDSUPPLY</p>
                <p className="text-2xl sm:text-3xl mt-10">
                  <span className="text-amber-300 font-semibold">합리적</span>이고{' '}
                  <span className="text-amber-300 font-semibold">가성비</span>적인 가격
                </p>
                <p className="text-2xl sm:text-3xl">
                  <span className="text-amber-300 font-semibold">최고</span>의 품질
                </p>
                <div className="w-full flex justify-end">
                  <Link
                    href={'/shop'}
                    className="text-white border-2 border-white px-4 p-2 hover:bg-white hover:text-black">
                    -{'>'} SHOP NOW
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
}

export default MainBanner;
