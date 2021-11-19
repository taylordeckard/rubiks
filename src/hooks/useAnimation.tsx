import { RefObject, useEffect } from 'react';
import { Main } from '../classes';

export function useAnimation (main: RefObject<Main>) {
  useEffect(() => {
    const animate = () => {
      if (main?.current?.cube?.rotation) {
        const click = main.current.mouseHandler.mouseClick;
        const mousePosition = main.current.mouseHandler.mousePosition;
        if (click.isDown) {
          main.current.cube.rotation.x = click.cubeX -
            ((click.mouseY - mousePosition.y) * 0.01);
          main.current.cube.rotation.y = click.cubeY -
            ((click.mouseX - mousePosition.x) * 0.01);
        } else {
          main.current.cube.rotation.x += 0.01;
          main.current.cube.rotation.y += 0.01;
        }
        main.current.renderer.render( main.current.scene, main.current.camera );
      }
      requestAnimationFrame( animate );
    }
    
    animate();
    // eslint-disable-next-line
  }, []);
}
