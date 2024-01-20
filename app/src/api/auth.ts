import {supabase} from '@/supabase/supabase.config';

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
