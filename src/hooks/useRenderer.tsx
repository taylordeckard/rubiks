import { useContext, useEffect } from 'react';
import { MainContext } from '../MainContext';
import { WEBGL } from '../utils';

export function useRenderer (appRef: HTMLDivElement | null) {
  const main = useContext(MainContext);
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
