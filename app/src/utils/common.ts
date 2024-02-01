import type {Option} from '../components/admin/post/useAddOption';
import type {Json} from '@/app/types/supabase';

export const addCommas = (number: number | string) => {
  let temp = number + '';
  return temp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const findPrice = (price: string, cur_option: string | null, options: Option[] | null) => {
  const foundOption = options?.find(option => option?.option_name === cur_option);
  return foundOption && foundOption[price as keyof Option] !== undefined ? foundOption[price as keyof Option] : '';
};

export function classNames(...classes: Array<string | boolean>) {
  return classes.filter(Boolean).join(' ');
}
export const changeJson = (arr: Json | Json[]) => {
  if (!arr) {
    return;
  }
  return JSON.parse(JSON.stringify(arr));
};
export const isAlreadyCart = (arr, id, option) => {
  if (
    arr?.find(obj => {
      return obj.id == id && obj.option == option;
    })
  ) {
    return true;
  }
  return false;
};
