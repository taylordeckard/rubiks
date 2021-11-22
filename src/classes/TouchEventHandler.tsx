import { EventHandler } from './EventHandler';

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
      const touchX = event.touches?.[0]?.screenX ?? this.parent.pointer.current.x;
      const touchY = event.touches?.[0]?.screenY ?? this.parent.pointer.current.y;
      this.parent.pointer = {
        active: isDown,
        current: {
          x: touchX,
          y: touchY,
        },
        activated: {
          cube: {
            x: this.parent.main.cube.rotation.x,
            y: this.parent.main.cube.rotation.y,
          },
          x: touchX,
          y: touchY,
        }
      };
    }
  }

  private onTouchMove (event: TouchEvent) {
    if (event instanceof TouchEvent) {
      event.preventDefault();
      this.parent.pointer.current = {
        x: event.touches?.[0]?.screenX,
        y: event.touches?.[0]?.screenY,
      };
    }
  }

}
