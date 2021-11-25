import { useContext, useEffect } from 'react';
import { MainContext } from '../MainContext';
import { Animator } from '../classes';

export function useAnimation () {
  const main = useContext(MainContext);
  useEffect(() => {
    if (main) {
      const animator = new Animator(main);
      
      animator.animate();
    }
    // eslint-disable-next-line
  }, []);
}
