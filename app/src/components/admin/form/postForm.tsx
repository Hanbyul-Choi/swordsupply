'use client';
import type {ChangeEvent, FormEvent} from 'react';
import React, {useState} from 'react';

import {useQuery, useQueryClient} from '@tanstack/react-query';

import {addCommas} from '@/app/src/utils/common';

import {getBrands, postPost, updateBrands} from '../../../api/admin';
import BrandSelect from '../../common/BrandSelect';
import {useBrandSelect} from '../../common/useBrandSelect';
import {useModal} from '../../overlay/modal/useModal';
import AddOptions from '../post/addOptions';
import UploadBox from '../post/uploadBox';
import UploadThumbnail from '../post/uploadThumbnail';
import {useAddOption} from '../post/useAddOption';

function PostForm() {
  const queryClient = useQueryClient();
  const {data: brand} = useQuery({queryKey: ['brands'], queryFn: getBrands});
  const brandProps = useBrandSelect(brand?.brands || []);
  const {items, brandChanged, selectedBrand} = brandProps;
  const {unmount} = useModal();
  const [optionsCheck, setOptionsCheck] = useState(false);
  const [product_name, setProduct_name] = useState('');
  const [description, setDescription] = useState('');
  const [event_price, setEvent_price] = useState('');
  const [origin_price, setOrigin_price] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [images, setImages] = useState([]);
  const desc_image: string[] = [];

  const {options, handleStatusChange, handleAddOption, handleInputChange, handleRemoveOption, initOptions} =
    useAddOption();

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    setProduct_name(value);
  };

  const onChangeEventPrice = (e: ChangeEvent<HTMLInputElement>) => {
    let {value} = e.target;
    value = value.replaceAll(',', '');
    if (isNaN(Number(value))) {
      return;
    }
    if (Number(value) > 9999999) {
      return;
    }
    value = addCommas(Number(value));
    setEvent_price(value);
  };

  const onChangeOriginPrice = (e: ChangeEvent<HTMLInputElement>) => {
    let {value} = e.target;
    value = value.replaceAll(',', '');
    if (isNaN(Number(value))) {
      return;
    }
    if (Number(value) > 9999999) {
      return;
    }
    value = addCommas(Number(value));
    setOrigin_price(value);
  };

  const onChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const {value} = e.target;
    setDescription(value);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (product_name === '') return alert('제목을 입력하세요');
    if (thumbnail === '') return alert('썸네일 사진을 등록하세요');
    if (images.length === 0) return alert('첨부사진을 업로드하세요');
    if (description === '' && images.length === 0) return alert('본문에 들어갈 내용을 작성해주세요');

    if (brandChanged) {
      updateBrands(items);
    }

    const newPost = {
      product_name,
      description,
      thumbnail,
      images,
      desc_image,
      brand: selectedBrand,
      options: optionsCheck ? options : [],
      origin_price: optionsCheck ? '' : origin_price,
      event_price: optionsCheck ? '' : event_price,
    };
    const error = await postPost(newPost);
    if (error) {
      return;
    }
    alert('등록이 완료되었습니다.');
    queryClient.refetchQueries({queryKey: [selectedBrand]});
    unmount('PostModal');
  };

  return (
    <div className="w-full flex flex-col items-center p-8 text-sm shadow-[1px_4px_7px_0_rgba(53,60,73,0.4)] overflow-y-scroll h-[80vh]">
      <p className="text-3xl">상품 추가</p>
      <form className="flex flex-col items-center" onSubmit={onSubmit}>
        <div className="flex flex-col">
          <label>
            상품명<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="border w-[30rem] p-2 mt-2 mb-4 rounded-md"
            onChange={onChangeTitle}
            value={product_name}
          />
          <label className="mb-2">
            브랜드<span className="text-red-500">*</span>
          </label>
          <BrandSelect brandProps={brandProps} />
          <label className="mt-4">상품 설명</label>
          <textarea
            placeholder="상품 설명 입력"
            className="resize-none border p-2 h-40 mt-2 mb-4 rounded-md"
            value={description}
            onChange={onChangeContent}
          />
          <div className="flex items-center mt-2">
            <label>옵션 설정</label>
            <input
              type="checkbox"
              className="ml-2 w-4 h-4"
              onChange={() => {
                setOptionsCheck(prev => !prev);
                setEvent_price('');
                setOrigin_price('');
                initOptions();
              }}
            />
          </div>
          {optionsCheck ? (
            <AddOptions
              options={options}
              handleAddOption={handleAddOption}
              handleInputChange={handleInputChange}
              handleRemoveOption={handleRemoveOption}
              handleStatusChange={handleStatusChange}
            />
          ) : (
            <div className="flex gap-4">
              <div>
                <label>
                  정가<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="border w-[10rem] p-2 ml-2 mt-2 mb-4 rounded-md"
                  onChange={onChangeOriginPrice}
                  value={origin_price}
                />
              </div>
              <div>
                <label>할인가</label>
                <input
                  type="text"
                  className="border w-[10rem] p-2 ml-2 mt-2 mb-4 rounded-md"
                  onChange={onChangeEventPrice}
                  value={event_price}
                />
              </div>
            </div>
          )}
          <label className="mb-2">
            썸네일<span className="text-red-500">*</span> <span className="text-slate-500">(MAX : 1장)</span>
          </label>
          <UploadThumbnail setThumbnail={setThumbnail} />
        </div>
        <div className="w-full text-start my-4">
          <p>
            제품 사진<span className="text-red-500">*</span>
          </p>
        </div>
        <div className="w-full">
          <div className="max-w-[30rem]">
            <UploadBox images={images} setImages={setImages} />
          </div>
        </div>
        <div className="flex gap-10">
          <button
            type="button"
            className="p-2 px-2 w-24 rounded-sm mt-4 border-2 border-blue"
            onClick={() => unmount('PostModal')}>
            취소
          </button>
          <button type="submit" className="p-2 px-2 w-24 rounded-sm mt-4 bg-blue text-white">
            상품게시
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
