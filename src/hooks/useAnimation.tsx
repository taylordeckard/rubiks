import { useEffect } from 'react';
import { Animator, Main } from '../classes';

export function useAnimation (main: Main) {
  useEffect(() => {
    if (main) {
      const animator = new Animator(main);
      
      animator.animate();
    }
    // eslint-disable-next-line
  }, []);
}
