import { Main } from './Main';

export class Animator {
  private main: Main;
  constructor (main: Main) {
    this.main = main;
  }

  public animate () {
    if (this.main.cube?.rotation) {
      const click = this.main.mouseHandler.mouseClick;
      const mousePosition = this.main.mouseHandler.mousePosition;
      if (click.isDown) {
        this.main.cube.rotation.x = click.cubeX -
          ((click.mouseY - mousePosition.y) * 0.01);
        this.main.cube.rotation.y = click.cubeY -
          ((click.mouseX - mousePosition.x) * 0.01);
      } else {
        this.main.cube.rotation.x += 0.01;
        this.main.cube.rotation.y += 0.01;
      }
      this.main.renderer.render(this.main.scene, this.main.camera );
    }
    requestAnimationFrame(this.animate.bind(this));
  }
}
