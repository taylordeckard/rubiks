import { RefObject, useEffect } from 'react';
import { Main } from '../classes';

export function useRenderer (appRef: HTMLDivElement | null, main: RefObject<Main>) {
  useEffect(() => {
    if (appRef && main?.current?.renderer) {
      if (appRef.lastChild) {
        appRef.replaceChild(
          appRef.lastChild,
          main.current.renderer.domElement,
        );
      } else {
        appRef.append(main.current.renderer.domElement);
      }
    }
  }, [appRef, main]);
}
