import { Main } from './Main';

export class Animator {
  private main: Main;
  constructor (main: Main) {
    this.main = main;
  }

  public animate () {
    requestAnimationFrame(this.animate.bind(this));
    const pointer = this.main.eventHandler.pointer;
    if (pointer.active) {
      this.main.cubes.deselectAllCubes();
      // use raycaster to see if click intersects an object
      this.main.raycaster.setFromCamera(pointer.current, this.main.camera);
      const intersects = this.main.raycaster.intersectObjects(this.main.scene.children, true);
      if (intersects.length) {
        const closest = intersects.reduce((memo, c) => {
          if (!memo) {
            return c;
          }
          if (Math.min(memo?.distance, c.distance) === c.distance) {
            return c;
          }
          return memo;
        }, { distance: Number.MAX_VALUE } as any);
        const sideCubes = this.main.cubes.getSideByCubeFace(closest);
        this.main.cubes.selectCubes(sideCubes);
      }
      this.main.cube.rotation.x = pointer.activated.cube.x +
        (pointer.activated.y - pointer.current.y);
      this.main.cube.rotation.y = pointer.activated.cube.y -
        (pointer.activated.x - pointer.current.x);
      this.main.cube.updateMatrixWorld();
    }
    this.main.renderer.render(this.main.scene, this.main.camera);
  }
}
