'use client';

import {type MouseEvent, useState} from 'react';

import {useOverlayContext} from '../dialog';

interface ModalProps {
  children: React.ReactNode;
  name: string;
  ignoreClickOutside?: 'ignoreOutSide';
}

export const Modal = ({children, name, ignoreClickOutside}: ModalProps) => {
  const {unmount} = useOverlayContext();
  const [mouseDownTarget, setMouseDownTarget] = useState<EventTarget | null>(null);

  // 자동 닫힘 타이머 세팅
  // useEffect(() => {
  //   let close = setTimeout(() => {
  //     unmount(name);
  //   }, 5000);

  //   return () => {
  //     clearTimeout(close);
  //   };
  // });

  const close = (event: MouseEvent<HTMLElement>) => {
    if (ignoreClickOutside === 'ignoreOutSide') return;
    const {target, currentTarget} = event;
    if (target !== currentTarget) return;
    if (mouseDownTarget !== currentTarget) return;
    unmount(name);
  };

  const getMouseDownEvent = (event: MouseEvent<HTMLElement>) => {
    setMouseDownTarget(event.target);
  };

  return (
    <div
      className="fixed top-0 left-0 z-50 w-screen h-screen bg-black/20"
      onClick={close}
      onMouseDown={getMouseDownEvent}>
      <div className="flex flex-col gap-8 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-white rounded-[8px]">
        {children}
      </div>
    </div>
  );
};
