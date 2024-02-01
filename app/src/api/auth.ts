import {supabase} from '@/supabase/supabase.config';

import type {TablesInsert, TablesUpdate} from '@/app/types/supabase';

interface IApiSignUp {
  email: string;
  password: string;
}

export const apiSignUp = async ({email, password}: IApiSignUp) => {
  const {data, error} = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) {
    console.log(error);
    return;
  }
  return data;
};

export const apiSignIn = async ({email, password}: IApiSignUp) => {
  const {data, error} = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.log(error);
    return;
  }
  return data;
};

export const setUserData = async (userData: TablesInsert<'users'>) => {
  await supabase.from('users').insert(userData);
};

export const getUser = async (user_id: string) => {
  const {data, error} = await supabase.from('users').select('*').eq('user_id', user_id).single();
  if (error) {
    console.log('first login');
  }
  return data;
};

export const userUpdate = async (user_id: string, updatedData: TablesUpdate<'users'>) => {
  const {data, error} = await supabase.from('users').update(updatedData).eq('user_id', user_id).select();
  if (error) {
    console.log(error);
  }
  return data;
};
