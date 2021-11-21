import { RefObject, useEffect } from 'react';
import { Animator, Main } from '../classes';

export function useAnimation (main: RefObject<Main>) {
  useEffect(() => {
    if (main?.current) {
      const animator = new Animator(main.current);
      
      animator.animate();
    }
    // eslint-disable-next-line
  }, []);
}
