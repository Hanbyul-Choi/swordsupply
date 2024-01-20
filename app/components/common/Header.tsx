import React from 'react';

import Link from 'next/link';
import {BsCart4} from 'react-icons/bs';

import LoginModal from '../LoginModal';

function Header() {
  return (
    <div className="fixed left-0 top-0 w-full py-4 px-10 flex flex-col justify-center gap-4 bg-white z-10 shadow-[0_1px_4px_0_rgba(53,60,73,0.08)]">
      <div className="flex justify-between items-center">
        <div className="w-32" />
        <Link className="text-4xl font-bold" href={'/'}>
          SWORDSUPPLY
        </Link>
        <div className="flex gap-10 w-32">
          <LoginModal />
          <BsCart4 size={25} />
        </div>
      </div>
      <nav className="flex gap-10  justify-center">
        <Link href={'/about'}>ABOUT</Link>
        <Link href={'/products'}>상품 목록</Link>
        <Link href={'/guide'}>주문방법</Link>
      </nav>
    </div>
  );
}

export default Header;
