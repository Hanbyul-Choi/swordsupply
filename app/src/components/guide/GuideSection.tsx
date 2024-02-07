import React from 'react';

import Image from 'next/image';

function GuideSection() {
  return (
    <div className="w-full break-keep bg-slate-100">
      <div className="sm:max-w-[1280px] mx-auto p-16 flex flex-col min-[900px]:flex-row items-center justify-center gap-8">
        <div className="p-4 w-full min-[900px]:w-1/3">
          <div className="w-full relative border-2 border-black aspect-square bg-white">
            <Image
              src={'/step1.png'}
              alt="step1"
              sizes="100"
              width={0}
              height={0}
              style={{objectFit: 'cover', width: '100%'}}
            />
          </div>
          <article className="mt-4 p-2 min-h-32">
            <h5 className="text-2xl font-semibold">1. 주문하기</h5>
            <p>원하는 상품을 카트에 담고, 쇼핑카트 아이콘을 클릭하여 담긴 상품을 확인 후 주문합니다.</p>
          </article>
        </div>
        <div className="p-4 w-full min-[900px]:w-1/3">
          <div className="w-full relative border-2 aspect-square border-black bg-white">
            <Image
              src={'/step2.png'}
              alt="step2"
              sizes="100"
              width={0}
              height={0}
              style={{objectFit: 'cover', width: '100%'}}
            />
          </div>
          <article className="mt-4 p-2 min-h-32">
            <h5 className="text-2xl font-semibold">2. 카카오톡 대화하기</h5>
            <p>주문 후 주문완료 페이지에 카카오톡 대화하기를 클릭합니다.</p>
          </article>
        </div>
        <div className="p-4 w-full min-[900px]:w-1/3">
          <div className="w-full aspect-square relative border-2 border-black">
            <Image
              src={'/step3.png'}
              alt="step3"
              sizes="100"
              width={0}
              height={0}
              style={{objectFit: 'cover', width: '100%'}}
            />
          </div>
          <article className="mt-4 p-2 min-h-32">
            <h5 className="text-2xl font-semibold">3. 결제 및 배송</h5>
            <p>이후, 성함과 연락처만 카톡으로 알려주시면 확인하여 안내해드리겠습니다</p>
          </article>
        </div>
      </div>
    </div>
  );
}

export default GuideSection;
