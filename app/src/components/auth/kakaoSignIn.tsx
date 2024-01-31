import React from 'react';

import Image from 'next/image';

import {supabase} from '@/supabase/supabase.config';

function KakaoSignIn() {
  return (
    <button
      className="mt-2 p-[10px] bg-[#FFEB3B] rounded-lg"
      onClick={() => {
        supabase.auth.signInWithOAuth({
          provider: 'kakao',
        });
      }}>
      <Image src={'/kakao.svg'} width={0} height={0} sizes="100" style={{width: '100%'}} alt={`kakao login`} />
    </button>
  );
}

export default KakaoSignIn;
