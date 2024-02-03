import React from 'react';

import Link from 'next/link';

export default function Page() {
  return (
    <>
      <div className="mx-[10%] bg-black text-white">
        <span>주문이 완료되었습니다.</span>
        <h2>하단의 카톡아이디로 주문자 성함과 전화번호를 알려주시면</h2>
        <h2>빠르게 결제 안내 도와드리겠습니다.</h2>
      </div>
      <Link href={`/shop`}>
        <p>계속둘러보기</p>
      </Link>

      <Link href={`/myorder`}>
        <p>주문내역확인하기</p>
      </Link>
    </>
  );
}
