'use client';
import React, {useState} from 'react';

import SignForm from './signForm';

const AuthModal = () => {
  const [modalType, setModalType] = useState<'SignIn' | 'SignUp'>('SignIn');

  const switchHandler = (type: 'SignIn' | 'SignUp') => {
    setModalType(type);
  };

  return (
    <div className="flex flex-col justify-center py-10 shadow-[1px_4px_7px_0_rgba(53,60,73,0.4)]">
      <SignForm signType={modalType} />
      {modalType === 'SignUp' ? (
        <p className="text-lg mx-auto mt-8">
          이미 회원이신가요?
          <button className="text-blue" onClick={() => switchHandler('SignIn')}>
            &nbsp; <u>로그인</u>
          </button>
        </p>
      ) : (
        <p className="text-lg mx-auto mt-8">
          아직 회원이 아니신가요?
          <button className="text-blue" onClick={() => switchHandler('SignUp')}>
            &nbsp;<u>회원가입</u>
          </button>
        </p>
      )}
    </div>
  );
};

export default AuthModal;
