import type {ReactNode} from 'react';

import {Modal} from './modal';
import {useOverlayContext} from '../dialog';

export const useModal = () => {
  const {mount: _mount, unmount: _unmount} = useOverlayContext();

  const mount = (name: string, element: ReactNode, ignoreClickOutside?: 'ignoreOutSide') => {
    _mount(
      name,
      <Modal name={name} ignoreClickOutside={ignoreClickOutside}>
        {element}
      </Modal>,
    );
  };

  const unmount = (name: string) => {
    _unmount(name);
  };

  return {mount, unmount};
};
