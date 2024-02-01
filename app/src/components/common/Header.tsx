'use client';
import React, {useEffect, useState} from 'react';

import {Dropdown} from 'antd';
import Link from 'next/link';
import {usePathname, useRouter} from 'next/navigation';
import {BsCart4} from 'react-icons/bs';
import {FaUser} from 'react-icons/fa6';

import useSessionStore from '@/app/src/store/session.store';
import {supabase} from '@/supabase/supabase.config';

import {getUser, setUserData} from '../../api/auth';
import LoginModal from '../LoginModal';

import type {MenuProps} from 'antd';

const navMenuItems = [
  {
    name: 'ABOUT US',
    path: '/about',
    font: 'font-roboto',
  },
  {
    name: 'SHOP',
    path: '/shop',
    font: 'font-roboto',
  },
  {
    name: '주문 방법',
    path: '/guide',
    font: '',
  },
];

function Header() {
  const {session, signOut: storeSignOut, setSession, isLoaded} = useSessionStore();
  const curPath = usePathname();
  const router = useRouter();
  const [position, setPosition] = useState(curPath === '/' ? 0 : 100);

  useEffect(() => {
    function onScroll() {
      if (curPath === '/') setPosition(window.scrollY);
    }
    if (curPath === '/') {
      window.addEventListener('scroll', onScroll);
      setPosition(0);
    }
    return () => {
      if (curPath === '/') {
        window.removeEventListener('scroll', onScroll);
      }
      setPosition(100);
    };
  }, [curPath]);

  const signOut = async () => {
    await supabase.auth.signOut();
    storeSignOut();
    alert('로그아웃 되었습니다.');
    router.push('/');
  };

  useEffect(() => {
    supabase.auth.getSession().then(async ({data: {session}}) => {
      if (session) {
        const {email, id: user_id} = session.user;

        const userData = await getUser(user_id);
        if (!userData) {
          const newUser = {
            user_id,
            email,
          };
          await setUserData(newUser);
          setSession(await getUser(user_id));
        }
        setSession(userData);
      } else if (session === null) {
        setSession(null);
      }
    });
  }, []);

  const items: MenuProps['items'] =
    session?.role !== 'admin'
      ? [
          {
            label: <Link href="/myorder">주문내역 조회</Link>,
            key: '0',
          },
          {
            label: <button onClick={signOut}>로그아웃</button>,
            key: '1',
          },
        ]
      : [
          {
            label: <Link href="/myorder">주문내역 조회</Link>,
            key: '0',
          },
          {
            label: <button onClick={signOut}>로그아웃</button>,
            key: '1',
          },
          {
            label: <Link href="/admin">상품관리</Link>,
            key: '2',
          },
        ];

  return (
    <div
      className={`sticky left-0 top-0 w-full pt-8 flex flex-col justify-center gap-4 z-10 ${
        position < 70 ? 'bg-transparent' : 'bg-white  shadow-[1px_2px_4px_0_rgba(53,60,73,0.4)] '
      } `}>
      <div className="flex justify-between items-center mb-4 px-4 sm:px-10">
        <div className="w-28 sm:w-32 h-8" />
        <Link className="text-4xl font-anton" href={'/'}>
          SWORDSUPPLY
        </Link>
        <div className="flex gap-3 sm:gap-10 w-32 justify-center">
          {isLoaded && session ? (
            <Dropdown menu={{items}} className="cursor-pointer">
              <a onClick={e => e.preventDefault()}>
                <FaUser size={18} className={`sm:hidden`} />
                <FaUser size={25} className={`max-sm:hidden `} />
              </a>
            </Dropdown>
          ) : (
            <LoginModal />
          )}
          <Link href={'/cart'}>
            <BsCart4 size={18} className={`sm:hidden `} />
            <BsCart4 size={25} className={`max-sm:hidden `} />
          </Link>
        </div>
      </div>
      <nav
        className={`flex gap-8 justify-center text-white bg-[#2a2a2a] ${
          position < 70 ? 'bg-transparent' : 'bg-[#2a2a2a] '
        }`}>
        {navMenuItems.map(item => (
          <Link
            href={item.path}
            key={item.name}
            className={`${item.font} p-4 border-b-4  hover:border-[#e5e7eb] ${
              curPath === item.path ? 'border-[#e5e7eb] ' : 'border-transparent '
            }`}>
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Header;
