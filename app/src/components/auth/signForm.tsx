'use client';
import React from 'react';

import KakaoSignIn from './kakaoSignIn';
import useSign from './useSign';

interface ISignForm {
  signType: 'SignIn' | 'SignUp';
  children?: React.ReactNode;
}

function SignForm({signType}: ISignForm) {
  const {onSubmit, onChangeEmail, onChangePassword, onChangePasswordConfirm, email, password, passwordConfirm, error} =
    useSign(signType);

  return (
    <div className="flex flex-col items-center w-fit mx-auto px-10">
      <h3 className="text-2xl">{signType === 'SignIn' ? '로그인' : '회원가입'}</h3>
      <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-10 items-cente w-80">
        <input
          type="email"
          placeholder="이메일"
          className="border-2 rounded-md p-2"
          value={email}
          onChange={onChangeEmail}
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="border-2 rounded-md p-2"
          value={password}
          onChange={onChangePassword}
        />
        {signType === 'SignUp' && (
          <input
            type="password"
            placeholder="비밀번호 확인"
            className="border-2 rounded-md p-2"
            value={passwordConfirm}
            onChange={onChangePasswordConfirm}
          />
        )}
        <p className="text-red-500 text-sm">{error || ''}</p>

        <button type="submit" className="border-[1px] rounded-md p-2 w-full bg-black text-white hover:opacity-70">
          {signType === 'SignIn' ? 'Login' : '회원가입'}
        </button>
      </form>
      <div className="flex items-center gap-4 w-full mt-8">
        <div className="h-[1px] w-full bg-sub4" />
        <p className="text-sm min-w-fit text-sub6">SNS 계정으로 간편로그인</p>
        <div className="h-[1px] w-full bg-sub4" />
      </div>
      <div className="mt-2">
        <KakaoSignIn />
      </div>
    </div>
  );
}

export default SignForm;
