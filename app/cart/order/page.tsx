import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  return (
    <>
      <div className="max-w-[1280px] mx-auto mt-12 text-center p-4">
        <div className="w-full p-4 bg-black text-white ">
          <p className="text-2xl sm:text-3xl p-6 border-b mb-4">주문이 완료되었습니다.</p>
          <p className="break-keep max-w-80 mx-auto">
            하단의 카톡아이디로 주문자 성함과 전화번호를 알려주시면 빠르게 결제 안내 도와드리겠습니다.
          </p>
          <a
            rel="noopener noreferrer"
            href={'https://prfl.link/@sword'}
            target="_blank"
            className="flex justify-center items-center gap-4 mt-4">
            <div className="mt-2 p-1 bg-[#FFEB3B] rounded-lg w-12 h-12 relative">
              <Image src={'/kakao.svg'} width={0} height={0} sizes="100" style={{width: '100%'}} alt={`kakao login`} />
            </div>
            <p className="text-xl text-[#FFEB3B]">카카오톡 대화하기</p>
          </a>
          <div className="flex gap-4 justify-evenly mx-auto md:w-1/2 mt-14">
            <Link href={`/shop`} className="border px-4 p-2">
              <p>계속둘러보기</p>
            </Link>
            <Link href={`/myorder`} className="border px-4 p-2">
              <p>주문내역확인하기</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
