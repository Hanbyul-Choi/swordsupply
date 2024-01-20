'use client';
import React from 'react';

import AuthModal from './auth/AuthModal';
import {useModal} from './overlay/modal/useModal';

function LoginModal() {
  const {mount} = useModal();

  return (
    <button
      className="text-center bg-cream hover:bg-cream-lighter rounded-full"
      onClick={() => {
        mount('AuthModal', <AuthModal />);
      }}>
      Login
    </button>
  );
}

export default LoginModal;
