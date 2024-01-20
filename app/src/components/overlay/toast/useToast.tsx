import Toast from './toast';
import {useOverlayContext} from '../OverlayProvider';

export default function useToast() {
  const {mount, unmount} = useOverlayContext();
  const toast = (text: string) => {
    return mount('Toast', <Toast text={text} unmount={() => unmount('Toast')} />);
  };
  return {toast};
}
