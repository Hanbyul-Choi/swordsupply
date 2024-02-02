'use client';
import type {ChangeEvent} from 'react';
import React, {useState} from 'react';

import {useRouter} from 'next/navigation';

import {userUpdate} from '../../api/auth';
import {orderCart} from '../../api/cart';
import useSessionStore from '../../store/session.store';
import Postcode from '../order/PostCode';

import type {TablesUpdate} from '@/app/types/supabase';

function Order() {
  const {session} = useSessionStore();
  const router = useRouter();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState({
    address: session.address || '',
    zonecode: session.zonecode || '',
    extraAddress: '',
    detailAddress: session.address_detail || '',
  });

  const [saveAddress, setSaveAddress] = useState(true);
  const [checkPolicy, setCheckPolicy] = useState(false);

  const changeNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const changePhoneNumberHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value);
  };
  const changeDetailAddress = (event: ChangeEvent<HTMLInputElement>) => {
    setAddress({...address, detailAddress: event.target.value});
  };

  const handleComplete = (data: any) => {
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
    }
    const address = {
      address: data.address,
      zonecode: data.zonecode,
      extraAddress,
      detailAddress: '',
    };
    setAddress(address);
  };

  const submitHandler = async event => {
    event.preventDefault();

    if (!name || !phoneNumber || !address.address || !address.detailAddress || !address.zonecode) {
      return;
    }

    const {user_id} = session;
    if (saveAddress) {
      const updatedUser: TablesUpdate<'users'> = {
        address: address.address,
        address_detail: address.extraAddress + ' ' + address.detailAddress,
        phone: phoneNumber,
        user_name: name,
        zonecode: address.zonecode,
      };
      const data = await userUpdate(user_id, updatedUser);
      if (!data) return;
    }

    // 아래 함수를 만들어서 주문 요청을 완료부탁드립니다.
    // cart api에 함수 이름만 만들어놓음
    await orderCart();

    alert('주문이 완료되었습니다.');
    router.push('/');
  };

  return (
    <div className="max-w-[1280px] mx-auto ">
      <p className="text-center text-3xl my-10">주문하기</p>
      <div className="flex w-full justify-center gap-10 items-center">
        <div className="p-4 bg-[#ecf0f4] flex flex-col justify-center items-center">
          {/* 주문정보 입력 및 주문 영역 */}
          <p className="text-xl">배송 정보 입력</p>
          <form onSubmit={submitHandler} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="">
                이름<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="p-2 w-full"
                value={name}
                onChange={changeNameHandler}
                placeholder="주문자 이름"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="">
                전화번호<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="p-2 w-full"
                value={phoneNumber}
                onChange={changePhoneNumberHandler}
                placeholder="주문자 연락처"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="">
                주소<span className="text-red-500">*</span>
              </label>
              <div className="flex text-nowrap gap-2">
                <input
                  type="text"
                  className="p-2 w-full"
                  value={address.address}
                  onChange={() => {}}
                  placeholder="배송 주소"
                />
                <Postcode handleComplete={handleComplete} />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="">
                우편번호<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="p-2 w-full"
                value={address.zonecode}
                onChange={() => {}}
                placeholder="우편 번호"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="">
                상세 주소<span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="p-2 w-1/2"
                  value={address.detailAddress}
                  onChange={changeDetailAddress}
                  placeholder="상세 주소"
                />
                <input type="text" className="p-2 w-1/2" value={address.extraAddress} onChange={() => {}} />
              </div>
            </div>
            <span className="text-red-600">필수항목을 모두 입력해주세요</span>
            <div className="space-y-2 mt-6">
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  checked={saveAddress}
                  onChange={() => setSaveAddress(prev => !prev)}
                  className="w-4"
                />
                <p>기본 주소로 설정</p>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  checked={checkPolicy}
                  onChange={() => setCheckPolicy(prev => !prev)}
                  className="w-4"
                />
                <p>환불 정책에 동의합니다.</p>
                <p>환불 정책에 동의해야 주문이 가능합니다!</p>
              </div>
            </div>
            <button className="w-full bg-black text-white p-2 mt-4">주문 및 결제</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Order;
