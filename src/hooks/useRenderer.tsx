import { RefObject, useEffect } from 'react';
import { Main } from '../classes';
import { WEBGL } from '../utils';

export function useRenderer (appRef: HTMLDivElement | null, main: RefObject<Main>) {
  useEffect(() => {
    if (appRef) {
      if (WEBGL.isWebGLAvailable()) {
        if (main?.current?.renderer) {
          if (appRef.lastChild) {
            appRef.replaceChild(
              appRef.lastChild,
              main.current.renderer.domElement,
            );
          } else {
            appRef.append(main.current.renderer.domElement);
          }
        }
      } else {
        const warning = WEBGL.getWebGLErrorMessage();
        appRef.appendChild( warning );
      }
    }
  }, [appRef, main]);
}
