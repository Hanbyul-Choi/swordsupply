'use client';
import React, {useEffect, useState} from 'react';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {useQuery} from '@tanstack/react-query';
import {Select} from 'antd';
import {Carousel} from 'react-responsive-carousel';

import {getProductsWithBrand} from '@/app/src/api/products';
import CountControl from '@/app/src/components/common/CountControl';
import {useCountControl} from '@/app/src/components/common/useCountControl';
import PriceSection from '@/app/src/components/PriceSection';
import {addCommas, findPrice} from '@/app/src/utils/common';

import type {Option} from '@/app/src/components/admin/post/useAddOption';

function Page({params: {id}, searchParams: {brand}}: {params: {id: string}; searchParams: {brand: string}}) {
  const {count, onChangeCount, onClickMinus, onClickPlus} = useCountControl();
  const {data, isLoading} = useQuery({queryKey: [brand], queryFn: () => getProductsWithBrand(brand)});

  const detailData = data?.find(product => product.product_id === id);

  const defaulteOption = detailData?.options !== null ? (detailData?.options[0] as Option) : null;
  const [curOption, setCurOption] = useState<null | string>(
    defaulteOption !== null ? defaulteOption?.option_name : null,
  );

  useEffect(() => {
    setCurOption(defaulteOption !== null ? defaulteOption?.option_name : null);
  }, [defaulteOption]);

  const handleChange = (value: string) => {
    setCurOption(value);
  };

  const putInCart = () => {
    const form = {
      curOption,
      count,
    };
    return form;
  };

  if (isLoading) {
    return <div>불러오는 중...</div>;
  }

  if (!detailData) {
    return <div className="flex justify-center items-center mt-96 text-2xl">해당 제품이 존재하지 않습니다.</div>;
  }

  let statusMsg = '카트에 담기';

  switch (detailData.status) {
    case 'SoldOut':
      statusMsg = '품절';
      break;

    case 'ComingSoon':
      statusMsg = '입고 예정';
      break;
  }
  return (
    <div className="mt-60 max-w-[1080px] mx-auto flex flex-col items-center p-8">
      <div className="flex flex-col justify-center gap-8 w-full md:flex-row">
        <div className="w-full md:w-1/2">
          <Carousel showArrows={false} showStatus={false} infiniteLoop emulateTouch thumbWidth={70}>
            {detailData.images?.map((img, i) => (
              <div key={i}>
                <img src={img} alt="제품 사진" style={{width: '100%', objectFit: 'cover', aspectRatio: '1/1'}} />
              </div>
            ))}
          </Carousel>
        </div>
        <article className="space-y-8 w-full md:w-1/2">
          <div className="border-b-2 pb-3 space-y-2">
            <h3 className="text-2xl">{detailData.product_name}</h3>
            <PriceSection
              event_price={detailData.event_price}
              origin_price={detailData.origin_price}
              options={detailData.options as Option[]}
              cur_option={curOption}
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-bold">배송비</span> 3,000원 (<u>100,000원</u> 이상 구매 시 무료배송)
            </p>
            <p className="text-sm">
              <span className="font-bold">구매혜택</span>{' '}
              {addCommas(
                Number(
                  (
                    detailData.event_price ||
                    detailData.origin_price ||
                    findPrice('event_price', curOption, detailData.options as Option[]) ||
                    findPrice('origin_price', curOption, detailData.options as Option[])
                  ).replaceAll(',', ''),
                ) *
                  Number(count) *
                  0.1,
              )}
              point 적립 예정
            </p>
          </div>
          <div className="bg-[#f9f9f9] p-4">
            {detailData.options?.length !== 0 && (
              <>
                <p className="w-full border-b-2 pb-2">사이즈</p>
                <div className="w-1/3 mt-2">
                  <Select
                    defaultValue={defaulteOption?.option_name}
                    style={{width: '100%', textAlign: 'center'}}
                    onChange={handleChange}
                    options={detailData.options?.map(option => {
                      const newOpt = option as Option;
                      return {value: newOpt.option_name, label: newOpt.option_name};
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
                ￦
                {addCommas(
                  Number(
                    (
                      detailData.event_price ||
                      detailData.origin_price ||
                      findPrice('event_price', curOption, detailData.options as Option[]) ||
                      findPrice('origin_price', curOption, detailData.options as Option[])
                    ).replaceAll(',', ''),
                  ) * Number(count),
                )}
              </p>
            </div>
          </div>
          <div className="flex justify-between">
            <p>총 상품 금액({count}개)</p>
            <p className="text-xl px-2">
              ￦
              {addCommas(
                Number(
                  (
                    detailData.event_price ||
                    detailData.origin_price ||
                    findPrice('event_price', curOption, detailData.options as Option[]) ||
                    findPrice('origin_price', curOption, detailData.options as Option[])
                  ).replaceAll(',', ''),
                ) * Number(count),
              )}
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={putInCart}
              className={`w-1/2 ml-auto bg-black text-white p-2 rounded-md hover:opacity-80 ${
                detailData.status !== 'Available' && 'bg-slate-500'
              }`}
              disabled={detailData.status !== 'Available'}>
              {statusMsg}
            </button>
          </div>
          <div>
            <p>환불정책</p>
            <p className="text-sm text-slate-500 mt-2">
              모든 제품은 미국 본사에서 직접 배송되는 상품으로 반품 및 교환이 불가합니다
            </p>
          </div>
        </article>
      </div>
      <div className="mt-20 p-4 text-center w-full border-t-2">
        <h3 className="text-lg my-10">제품설명</h3>
        <p>{detailData.description}</p>
      </div>
    </div>
  );
}

export default Page;
