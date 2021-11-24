import { useEffect } from 'react';
import { Main } from '../classes';
import { WEBGL } from '../utils';

export function useRenderer (appRef: HTMLDivElement | null, main: Main) {
  useEffect(() => {
    if (appRef) {
      if (WEBGL.isWebGLAvailable()) {
        if (main.renderer) {
          if (appRef.lastChild) {
            appRef.replaceChild(
              appRef.lastChild,
              main.renderer.domElement,
            );
          } else {
            appRef.append(main.renderer.domElement);
          }
        }
      } else {
        const warning = WEBGL.getWebGLErrorMessage();
        appRef.appendChild( warning );
      }
    }
  }, [appRef, main]);
}
