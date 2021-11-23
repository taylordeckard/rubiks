import { EventHandler } from './EventHandler';
import { Vector2 } from 'three';

export class TouchEventHandler {

  constructor (private parent: EventHandler) {
    const elem = parent.main.renderer.domElement;
    elem.ontouchstart = this.onTouchChange.bind(this, true);
    elem.ontouchend = this.onTouchChange.bind(this, false);
    elem.ontouchmove = this.onTouchMove.bind(this);
  }

  private onTouchChange (isDown: boolean, event: TouchEvent) {
    if (event instanceof TouchEvent) {
      event.preventDefault();
      this.parent.pointer = {
        active: isDown,
        current: new Vector2(this.getX(event), this.getY(event)),
        activated: {
          cube: {
            x: this.parent.main.cube.rotation.x,
            y: this.parent.main.cube.rotation.y,
          },
          x: this.getX(event),
          y: this.getY(event),
        }
      };
    }
  }

  private onTouchMove (event: TouchEvent) {
    if (event instanceof TouchEvent) {
      event.preventDefault();
      this.parent.pointer.current.x = this.getX(event);
      this.parent.pointer.current.y = this.getY(event);
    }
  }

  private getX (event: TouchEvent) {
    const touchX = event.touches?.[0]?.clientX;
    return (touchX / window.innerWidth) * 2 - 1;
  }

  private getY (event: TouchEvent) {
    const touchY = event.touches?.[0]?.clientY;
    return - (touchY / window.innerHeight) * 2 + 1;
  }

}
