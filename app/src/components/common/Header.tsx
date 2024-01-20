'use client';
import React, {useEffect} from 'react';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {BsCart4} from 'react-icons/bs';

import useSessionStore from '@/app/src/store/session.store';
import {supabase} from '@/supabase/supabase.config';

import LoginModal from '../LoginModal';

const navMenuItems = [
  {
    name: 'ABOUT',
    path: '/about',
    font: 'font-roboto',
  },
  {
    name: '상품 목록',
    path: '/products',
    font: '',
  },
  {
    name: '주문 방법',
    path: '/guide',
    font: '',
  },
];

function Header() {
  const {session, setSession} = useSessionStore();
  const curPath = usePathname();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setSession(session.user);
      }
    });
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    alert('로그아웃 되었습니다.');
  };
  return (
    <div className="fixed left-0 top-0 w-full pt-8 px-10 flex flex-col justify-center gap-4 bg-white z-10 shadow-[0_1px_4px_0_rgba(53,60,73,0.08)]">
      <div className="flex justify-between items-center mb-4">
        <div className="w-32" />
        <Link className="text-4xl font-anton" href={'/'}>
          SWORDSUPPLY
        </Link>
        <div className="flex gap-10 w-32">
          {session ? (
            <button className="font-roboto" onClick={signOut}>
              Logout
            </button>
          ) : (
            <LoginModal />
          )}

          <BsCart4 size={25} />
        </div>
      </div>
      <nav className="flex gap-10 justify-center">
        {navMenuItems.map(item => (
          <Link
            href={item.path}
            key={item.name}
            className={`${item.font} p-2 hover:border-b-[3px] hover:border-black ${
              curPath === item.path ? 'border-b-[3px] border-black' : ''
            }`}>
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Header;
