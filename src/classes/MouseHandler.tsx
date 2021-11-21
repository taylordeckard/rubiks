import { Main } from './Main';

export class MouseHandler {

  public mouseClick: {
    isDown: boolean;
    cubeX: number;
    cubeY: number;
    mouseX: number;
    mouseY: number;
  } = {
    isDown: false,
    cubeX: 0,
    cubeY: 0,
    mouseX: 0,
    mouseY: 0,
  };

  public mousePosition: {
    x: number;
    y: number;
  } = {
    x: 0,
    y: 0,
  };

  private main: Main;

  constructor (main: Main) {
    const elem = main.renderer.domElement;
    this.main = main;
    elem.onmousedown = this.onMouseChange.bind(this, true);
    elem.onmouseup = this.onMouseChange.bind(this, false);
    elem.onmousemove = this.onMouseMove.bind(this);
    elem.ontouchstart = this.onMouseChange.bind(this, true);
    elem.ontouchend = this.onMouseChange.bind(this, false);
    elem.ontouchmove = this.onMouseMove.bind(this);
  }

  private onMouseChange (isDown: boolean, event: MouseEvent | TouchEvent) {
    if (event instanceof MouseEvent) {
      this.mouseClick = {
        isDown,
        cubeX: this.main.cube.rotation.x,
        cubeY: this.main.cube.rotation.y,
        mouseX: event.clientX,
        mouseY: event.clientY,
      };
    } else {
      event.preventDefault();
      const mouseX = event.touches?.[0]?.screenX ?? this.mouseClick.mouseX;
      const mouseY = event.touches?.[0]?.screenY ?? this.mouseClick.mouseY;
      this.mouseClick = {
        isDown,
        mouseX,
        mouseY,
        cubeX: this.main.cube.rotation.x,
        cubeY: this.main.cube.rotation.y,
      };
      this.mousePosition = { x: mouseX, y: mouseY };
    }
  }

  private onMouseMove (event: MouseEvent | TouchEvent) {
    if (event instanceof MouseEvent) {
      this.mousePosition = { x: event.clientX, y: event.clientY };
    } else {
      event.preventDefault();
      this.mousePosition = { x: event.touches?.[0]?.screenX, y: event.touches?.[0]?.screenY };
    }
  }

}
