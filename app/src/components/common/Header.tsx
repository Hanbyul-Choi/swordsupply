'use client';
import React, {useEffect} from 'react';

import {Dropdown} from 'antd';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {BsCart4} from 'react-icons/bs';
import {FaUser} from 'react-icons/fa6';

import useSessionStore from '@/app/src/store/session.store';
import {supabase} from '@/supabase/supabase.config';

import {getUser} from '../../api/auth';
import LoginModal from '../LoginModal';

import type {MenuProps} from 'antd';

const navMenuItems = [
  {
    name: 'ABOUT',
    path: '/about',
    font: 'font-roboto',
  },
  {
    name: 'BRAND1',
    path: '/products/brand1',
    font: 'font-roboto',
  },
  {
    name: 'BRAND2',
    path: '/products/brand2',
    font: 'font-roboto',
  },
  {
    name: 'BRAND3',
    path: '/products/brand3',
    font: 'font-roboto',
  },
  {
    name: 'BRAND4',
    path: '/products/brand4',
    font: 'font-roboto',
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

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    alert('로그아웃 되었습니다.');
  };

  const items: MenuProps['items'] = [
    {
      label: <Link href="/myorder">주문내역 조회</Link>,
      key: '0',
    },
    {
      label: <button onClick={signOut}>로그아웃</button>,
      key: '1',
    },
  ];

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        const user_id = session.user.id;
        setSession(await getUser(user_id));
      }
    });
  }, []);

  return (
    <div className="fixed left-0 top-0 w-full pt-8 px-10 flex flex-col justify-center gap-4 bg-white z-10 shadow-[0_1px_4px_0_rgba(53,60,73,0.08)]">
      <div className="flex justify-between items-center mb-4">
        <div className="w-32" />
        <Link className="text-4xl font-anton" href={'/'}>
          SWORDSUPPLY
        </Link>
        <div className="flex gap-10 w-32">
          {session ? (
            <Dropdown menu={{items}}>
              <a onClick={e => e.preventDefault()}>
                <FaUser size={25} />
              </a>
            </Dropdown>
          ) : (
            <LoginModal />
          )}
          <Link href={'/cart'}>
            <BsCart4 size={25} />
          </Link>
        </div>
      </div>
      <nav className="flex gap-8 justify-center">
        {navMenuItems.map(item => (
          <Link
            href={item.path}
            key={item.name}
            className={`${item.font} p-2 border-b-[3px]  hover:border-black ${
              curPath === item.path ? 'border-b-[3px] border-black' : 'border-transparent'
            }`}>
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Header;
