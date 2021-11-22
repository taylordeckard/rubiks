import { Main } from './Main';

export class Animator {
  private main: Main;
  constructor (main: Main) {
    this.main = main;
  }

  public animate () {
    if (this.main.cube?.rotation) {
      const pointer = this.main.eventHandler.pointer;
      if (pointer.active) {
        this.main.cube.rotation.x = pointer.activated.cube.x -
          ((pointer.activated.y - pointer.current.y) * 0.01);
        this.main.cube.rotation.y = pointer.activated.cube.y -
          ((pointer.activated.x - pointer.current.x) * 0.01);
      }
      this.main.renderer.render(this.main.scene, this.main.camera );
    }
    requestAnimationFrame(this.animate.bind(this));
  }
}
