'use client';
import type {ChangeEvent, FormEvent} from 'react';
import React, {useState} from 'react';

import Link from 'next/link';

import SelectBox from './post/selectBox';
import UploadBox from './post/uploadBox';
import UploadThumbnail from './post/uploadThumbnail';
import {postPost} from '../../api/admin';

function PostForm() {
  const [product_name, setProduct_name] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [category, setCategory] = useState('');
  const images: string[] = [];

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    setProduct_name(value);
  };

  const onChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const {value} = e.target;
    setDescription(value);
  };

  const selectCategory = (value: string) => {
    setCategory(value);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (product_name === '') return alert('제목을 입력하세요');
    if (category === '') return alert('제품을 선택하세요');
    if (thumbnail === '') return alert('썸네일 사진을 등록하세요');
    if (description === '' && images.length === 0) return alert('본문에 들어갈 내용을 작성해주세요');

    const newPost = {
      product_name,
      description,
      thumbnail,
      images,
      category,
    };
    const error = await postPost(newPost);
    if (error) {
      return;
    }
    alert('등록이 완료되었습니다.');
  };

  return (
    <div className="w-full flex flex-col items-center gap-10 p-8">
      <p className="text-3xl">상품 추가</p>
      <form className="flex flex-col items-center" onSubmit={onSubmit}>
        <div className="flex flex-col gap-4">
          <label>
            제목<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="제목을 입력하세요"
            className="border w-[30rem] p-2"
            onChange={onChangeTitle}
            value={product_name}
          />
          <label>본문</label>
          <textarea
            placeholder="본문 입력하세요"
            className="resize-none border p-2 h-40"
            value={description}
            onChange={onChangeContent}
          />
          <div>
            <SelectBox selectCategory={selectCategory} />
          </div>
          <label>
            썸네일<span className="text-red-500">*</span> <span className="text-slate-500">(MAX : 1장)</span>
          </label>
          <UploadThumbnail setThumbnail={setThumbnail} />
        </div>
        <div className="w-full text-start my-4">
          <p>
            첨부 사진 <span className="text-slate-500">(MAX : 5장)</span>
          </p>
        </div>
        <div className="w-full">
          <div className="max-w-[30rem]">
            <UploadBox images={images} />
          </div>
        </div>
        <div className="flex gap-10">
          <Link href={'/admin'} className="p-2 px-2 w-fit rounded-lg mt-4 border-2 border-black">
            취소하기
          </Link>
          <button className="bg-primary p-2 px-2 w-fit text-white rounded-lg mt-4">등록하기</button>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
