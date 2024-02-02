import {useEffect, useState} from 'react';

import {apiSignIn, apiSignUp, getUser, setUserData} from '@/app/src/api/auth';
import useSessionStore from '@/app/src/store/session.store';

import {useModal} from '../overlay/modal/useModal';

import type {TablesInsert} from '@/app/types/supabase';

export default function useSign(SignTypeDefault: 'SignIn' | 'SignUp') {
  const oppositeSignType = SignTypeDefault === 'SignIn' ? 'SignUp' : 'SignIn';
  const [signType, setSignType] = useState(SignTypeDefault);
  const {unmount} = useModal();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const {setSession} = useSessionStore();
  const [error, setError] = useState<null | string>(null);

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const onChangePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value);
  };

  const resetInput = () => {
    setPassword('');
    setPasswordConfirm('');
  };

  useEffect(() => {
    if (passwordConfirm) {
      if (password !== passwordConfirm) {
        return setError('비밀번호가 일치하지 않습니다.');
      }
    }
    setError(null);
  }, [password, passwordConfirm]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password.replaceAll(' ', '') === '') return setError('비밀번호를 입력하세요');
    if (email.replaceAll(' ', '') === '') return;

    console.log(signType);

    if (signType === 'SignUp') {
      if (passwordConfirm.replaceAll(' ', '') === '') return setError('비밀번호를 입력하세요');
      const error = await SignUp(email, password);
      if (error) {
        if (error.message === 'User already registered') {
          resetInput();
          alert('이미 가입된 계정입니다.');
        } else {
          resetInput();
          alert('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        }
        return;
      }
      return setSignType('SignIn');
    } else if (signType === 'SignIn') {
      const error = await SignIn(email, password);
      if (error) {
        resetInput();
        alert('이메일 혹은 비밀번호를 확인해주세요');
        return;
      }
      unmount('AuthModal');
    }
    setEmail('');
    setPassword('');
    setPasswordConfirm('');
  };

  const SignUp = async (email: string, password: string) => {
    const {data, error} = await apiSignUp({email, password});
    if (error) {
      return error;
    }
    if (data) {
      alert('회원가입이 완료되었습니다.');
    }
  };

  const SignIn = async (email: string, password: string) => {
    const {data, error} = await apiSignIn({email, password});
    if (error) {
      return error;
    }
    if (data) {
      const user_id = data.session.user.id;
      const userData = await getUser(user_id);
      if (!userData) {
        const userData: TablesInsert<'users'> = {
          user_id,
          email,
        };
        await setUserData(userData);
        setSession(await getUser(user_id));
      } else {
        setSession(userData);
      }
    }
  };

  return {
    oppositeSignType,
    onSubmit,
    onChangeEmail,
    onChangePassword,
    onChangePasswordConfirm,
    email,
    password,
    passwordConfirm,
    error,
  };
}
