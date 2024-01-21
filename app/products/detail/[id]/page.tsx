'use client';
import React, {useState} from 'react';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {Select} from 'antd';
import {Carousel} from 'react-responsive-carousel';

import CountControl from '@/app/src/components/common/CountControl';
import {useCountControl} from '@/app/src/components/common/useCountControl';
import {mock} from '@/app/src/components/main-page/BestSeller';
import {addCommas} from '@/app/src/utils/common';

function Page({params: {id}}: {params: {id: string}}) {
  const [size, setSize] = useState<null | string>(null);
  const {count, onChangeCount, onClickMinus, onClickPlus} = useCountControl();

  const putInCart = () => {
    const form = {
      size,
      count,
    };
    return form;
  };

  const detailData = mock.find(product => product.product_id === id);

  const handleChange = (value: string) => {
    setSize(value);
  };

  if (!detailData) {
    return <div className="flex justify-center items-center mt-96 text-2xl">해당 제품이 존재하지 않습니다.</div>;
  }
  return (
    <div className="mt-60 max-w-[1080px] mx-auto flex flex-col items-center">
      <div className="flex gap-10">
        <div className="w-1/2 p-10">
          <Carousel showArrows={false} showStatus={false} infiniteLoop emulateTouch thumbWidth={70}>
            {detailData.images.map((img, i) => (
              <img src={img} key={i} alt="제품 썸네일" style={{width: '100%'}} />
            ))}
          </Carousel>
          <div className="w-80">
            {/* <Image
            src={detailData.thumbnail}
            alt="제품 썸네일"
            width={0}
            height={0}
            sizes="100"
            style={{width: '100%'}}
          /> */}
          </div>
        </div>
        <article className="space-y-8 px-4 p-4 min-w-96">
          <div className="border-b-2 pb-3 space-y-2">
            <h3 className="text-2xl">{detailData.product_name}</h3>
            {detailData.eventPrice ? (
              <div className="flex gap-4 items-center">
                <p className="line-through">￦{addCommas(detailData.originPrice)}</p>
                <p className="text-lg">￦{addCommas(detailData.eventPrice)}</p>
              </div>
            ) : (
              <p className="">￦{addCommas(detailData.originPrice)}</p>
            )}
          </div>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-bold">배송비</span> 3,000원 (<u>100,000원</u> 이상 구매 시 무료배송)
            </p>
            <p className="text-sm">
              <span className="font-bold">구매혜택</span>{' '}
              {addCommas(detailData.eventPrice || detailData.originPrice * Number(count) * 0.1)}point 적립 예정
            </p>
          </div>
          <div className="bg-[#f9f9f9] p-4">
            {detailData.options?.length !== 0 && (
              <>
                <p className="w-full border-b-2 pb-2">사이즈</p>
                <div className="w-1/3 mt-2">
                  <Select
                    defaultValue={'8oz'}
                    style={{width: '100%'}}
                    onChange={handleChange}
                    options={detailData.options.map(option => {
                      return {value: option, label: option};
                    })}
                  />
                </div>
              </>
            )}
            <p className="w-full border-b-2 pb-2 mt-4 ">수량</p>
            <div className="w-full mt-2 flex justify-between items-center">
              <div className="w-1/3 bg-white">
                <CountControl
                  count={count}
                  onChangeCount={onChangeCount}
                  onClickMinus={onClickMinus}
                  onClickPlus={onClickPlus}
                />
              </div>
              <p className="text-center">
                ￦{addCommas(detailData.eventPrice || detailData.originPrice * Number(count))}
              </p>
            </div>
          </div>
          <div className="flex justify-between">
            <p>총 상품 금액({count}개)</p>
            <p className="text-xl">￦{addCommas(detailData.eventPrice || detailData.originPrice * Number(count))}</p>
          </div>
          <button onClick={putInCart} className="w-full bg-black text-white p-2 rounded-md">
            카트에 담기
          </button>
          <p>환불정책</p>
          <p className="text-sm text-slate-500">
            모든 제품은 미국 본사에서 직접 배송되는 상품으로 반품 및 교환이 불가합니다
          </p>
        </article>
      </div>
      <div className="p-4 text-center w-2/3">
        <h3 className="text-lg my-10">제품설명</h3>
        <p>{detailData.description}</p>
      </div>
    </div>
  );
}

export default Page;
