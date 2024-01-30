'use client';
import React from 'react';

import PostForm from './form/postForm';
import {useModal} from '../overlay/modal/useModal';

function PostModal() {
  const {mount} = useModal();

  return (
    <button
      className="px-2 rounded-sm bg-blue opacity-80 hover:opacity-100 text-white"
      onClick={() => {
        mount('PostModal', <PostForm />);
      }}>
      상품 추가하기
    </button>
  );
}

export default PostModal;
