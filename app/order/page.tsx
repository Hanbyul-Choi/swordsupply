'use client';
import React, {useState} from 'react';

import Postcode from '../src/components/order/PostCode';

function Page() {
  const [address, setAddress] = useState('');

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let address = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    setAddress(address);
    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  };

  return (
    <div className="max-w-[1280px] mx-auto ">
      <p className="text-center text-3xl my-10">주문하기</p>
      <div className="flex w-full justify-center gap-10 items-center">
        <div className="p-4 bg-[#ecf0f4] flex flex-col justify-center items-center">
          <p className="text-xl">배송 정보 입력</p>
          <form action="" className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="">
                이름<span className="text-red">*</span>
              </label>
              <input type="text" className="p-2 w-96" placeholder="주문자 성함" />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="">
                전화번호<span className="text-red">*</span>
              </label>
              <input type="text" className="p-2 w-96" placeholder="연락 받으실 번호" />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="">
                주소<span className="text-red">*</span>
              </label>
              <div className="flex text-nowrap gap-2">
                <input type="text" className="p-2 w-full" value={address} placeholder="배송 주소" />
                <Postcode handleComplete={handleComplete} />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="">
                우편번호<span className="text-red">*</span>
              </label>
              <input type="text" className="p-2 w-96" placeholder="우편 번호" />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="">
                상세 주소(아파트, 건물 상호명, 동, 호수)<span className="text-red">*</span>
              </label>
              <input type="text" className="p-2 w-96" placeholder="상세 주소" />
            </div>
          </form>
        </div>
        <div className="p-4 bg-[#ecf0f4]">
          <p className="text-xl">주문 내역</p>
        </div>
      </div>
    </div>
  );
}

export default Page;
