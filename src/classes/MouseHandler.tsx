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
  }

  private onMouseChange (isDown: boolean, event: MouseEvent) {
    this.mouseClick = {
      isDown,
      cubeX: this.main.cube.rotation.x,
      cubeY: this.main.cube.rotation.y,
      mouseX: event.clientX,
      mouseY: event.clientY,
    };
  }

  private onMouseMove (event: MouseEvent) {
    this.mousePosition = { x: event.clientX, y: event.clientY };
  }

}
