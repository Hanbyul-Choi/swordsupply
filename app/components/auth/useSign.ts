import {useEffect, useState} from 'react';

import {useRouter} from 'next/navigation';

import {apiSignIn, apiSignUp} from '@/app/api/auth';
import useSessionStore from '@/app/store/session.store';

export default function useSign(SignType: 'SignIn' | 'SignUp') {
  const oppositeSignType = SignType === 'SignIn' ? 'SignUp' : 'SignIn';
  const router = useRouter();
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

  useEffect(() => {
    if (passwordConfirm === '') return;
    if (password !== passwordConfirm) {
      return setError('비밀번호가 일치하지 않습니다.');
    }
    setError(null);
  }, [password, passwordConfirm]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email.replaceAll(' ', '') === '') return;
    if (SignType === 'SignUp') {
      SignUp(email, password);
    } else if (SignType === 'SignIn') {
      SignIn(email, password);
    }
  };

  const SignUp = async (email: string, password: string) => {
    const data = await apiSignUp({email, password});
    if (data) {
      alert('회원가입이 완료되었습니다.');
    }
  };

  const SignIn = async (email: string, password: string) => {
    const data = await apiSignIn({email, password});
    if (data) {
      setSession(data.session.user);
      router.push('/');
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
