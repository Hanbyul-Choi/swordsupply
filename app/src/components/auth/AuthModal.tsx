'use client';
import React, {useState} from 'react';

import SignForm from './signForm';

// type SignUpModalProps = {
//   switchHandler: (type: 'SignIn' | 'SignUp') => void;
//   modalType: 'SignIn' | 'SignUp';
// };

const AuthModal = () => {
  const [modalType, setModalType] = useState<'SignIn' | 'SignUp'>('SignIn');

  const switchHandler = (type: 'SignIn' | 'SignUp') => {
    setModalType(type);
  };

  return (
    <div className="flex flex-col justify-center py-10">
      <SignForm signType={modalType} />
      {modalType === 'SignUp' ? (
        <p className="text-lg mx-auto mt-12">
          이미 회원이신가요?
          <button className="text-blue" onClick={() => switchHandler('SignIn')}>
            &nbsp; 로그인
          </button>
        </p>
      ) : (
        <p className="text-lg mx-auto mt-12">
          아직 회원이 아니신가요?
          <button className="text-blue" onClick={() => switchHandler('SignUp')}>
            &nbsp; 회원가입
          </button>
        </p>
      )}
    </div>
  );
};

export default AuthModal;
