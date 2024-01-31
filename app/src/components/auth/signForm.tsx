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
    <div className="flex flex-col items-center w-fit mx-auto px-20">
      <h3 className="text-2xl">{signType === 'SignIn' ? '로그인' : '회원가입'}</h3>
      <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-10 items-center">
        <input
          type="email"
          placeholder="이메일"
          className="border-2 border-black rounded-md p-2"
          value={email}
          onChange={onChangeEmail}
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="border-2 border-black rounded-md p-2"
          value={password}
          onChange={onChangePassword}
        />
        {signType === 'SignUp' && (
          <input
            type="password"
            placeholder="비밀번호 확인"
            className="border-2 border-black rounded-md p-2"
            value={passwordConfirm}
            onChange={onChangePasswordConfirm}
          />
        )}
        <p className="text-red-500 text-sm">{error || ''}</p>

        <button type="submit" className="border-[1px] border-black rounded-md px-2 w-fit hover:bg-slate-300">
          {signType === 'SignIn' ? 'Login' : '회원가입'}
        </button>
      </form>
      <div className="flex gap-2">
        {/* <GoogleSignIn /> */}
        <KakaoSignIn />
      </div>
    </div>
  );
}

export default SignForm;
