import { EventHandler } from './EventHandler';

export class MouseEventHandler {

  constructor (private parent: EventHandler) {
    const elem = parent.main.renderer.domElement;
    elem.onmousedown = this.onMouseChange.bind(this, true);
    elem.onmouseup = this.onMouseChange.bind(this, false);
    elem.onmousemove = this.onMouseMove.bind(this);
  }

  private onMouseChange (isDown: boolean, event: MouseEvent) {
    if (event instanceof MouseEvent) {
      this.parent.pointer = {
        active: isDown,
        current: this.parent.pointer.current,
        activated: {
          cube: {
            x: this.parent.main.cube.rotation.x,
            y: this.parent.main.cube.rotation.y,
          },
          x: this.parent.pointer.current.x,
          y: this.parent.pointer.current.y,
        }
      };
    }
  }

  private onMouseMove (event: MouseEvent) {
    if (event instanceof MouseEvent) {
      this.parent.pointer.current.x = this.getX(event);
      this.parent.pointer.current.y = this.getY(event);
    }
  }

  private getX (event: MouseEvent) {
    return (event.clientX / window.innerWidth) * 2 - 1;
  }

  private getY (event: MouseEvent) {
    return - (event.clientY / window.innerHeight) * 2 + 1;
  }

}
