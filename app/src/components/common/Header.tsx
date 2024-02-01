'use client';
import React, {useEffect} from 'react';

import {Dropdown} from 'antd';
import Link from 'next/link';
import {usePathname, useRouter} from 'next/navigation';
import {BsCart4} from 'react-icons/bs';
import {FaUser} from 'react-icons/fa6';

import useCartStore from '@/app/src/store/carts.store';
import useSessionStore from '@/app/src/store/session.store';
import {supabase} from '@/supabase/supabase.config';

import {getUser, setUserData} from '../../api/auth';
import {getCart, postCart} from '../../api/cart';
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
  const {cart, setCart} = useCartStore();
  const curPath = usePathname();
  const router = useRouter();

  const signOut = async () => {
    await supabase.auth.signOut();
    storeSignOut();
    alert('로그아웃 되었습니다.');
    setCart(null);
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
        const user_cart = await getCart(user_id);
        if (!user_cart) {
          await postCart({user_id});
          setCart(await getCart(user_id));
        }
        setCart(user_cart);
      } else if (session === null) {
        setSession(null);
      }
    });
  }, []);

  // useEffect(() => {
  //   supabase.auth.onAuthStateChange(async (event, session) => {
  //     if (session) {
  //       const {email, id: user_id} = session.user;

  //       const userData = await getUser(user_id);
  //       if (!userData) {
  //         const newUser = {
  //           user_id,
  //           email,
  //         };
  //         await setUserData(newUser);
  //         setSession(await getUser(user_id));
  //       }
  //       setSession(userData);
  //     } else if (session === null) {
  //       setSession(null);
  //     }
  //   });
  // }, []);

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
    <div className="fixed left-0 top-0 w-full pt-8 px-10 flex flex-col justify-center gap-4 bg-white z-10 shadow-[0_1px_4px_0_rgba(53,60,73,0.08)]">
      <div className="flex justify-between items-center mb-4">
        <div className="w-32" />
        <Link className="text-4xl font-anton" href={'/'}>
          SWORDSUPPLY
        </Link>
        <div className="flex gap-10 w-32">
          {isLoaded && session ? (
            <Dropdown menu={{items}}>
              <a onClick={e => e.preventDefault()}>
                <FaUser size={25} />
              </a>
            </Dropdown>
          ) : (
            <LoginModal />
          )}
          <Link href={'/cart'} className="relative">
            <BsCart4 size={25} />
            {session && cart && (
              <div className="bg-red-600 w-6 h-6 rounded-full text-center absolute -top-2 -right-3">
                <span className="text-white">{cart?.cart_list?.length}</span>
              </div>
            )}
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
