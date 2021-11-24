import { Main } from './Main';
import { FaceRotation } from './Cubes';

export class Animator {
  private main: Main;
  private activeFaceRotation: FaceRotation | undefined;
  private hasSelection = false;
  constructor (main: Main) {
    this.main = main;
  }

  public animate () {
    requestAnimationFrame(this.animate.bind(this));
    this.controlSelection();
    this.controlGlobalRotation();
    this.controlFaceRotation();
    this.animateFaceRotation();
    this.main.renderer.render(this.main.scene, this.main.camera);
  }

  private controlSelection () {
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
        const { sideCubes, faceIndex } = this.main.cubes.getSideByCubeFace(closest);
        this.main.cubes.selectCubes(sideCubes, faceIndex);
        if (!this.hasSelection) {
          this.hasSelection = true;
          this.main.dispatcher.dispatchEvent({ type: 'onSelectionChange', hasSelection: true })
        }
      } else {
        if (this.hasSelection) {
          this.hasSelection = false;
          this.main.dispatcher.dispatchEvent({ type: 'onSelectionChange', hasSelection: false })
        }
      }
    }
  }

  private controlGlobalRotation () {
    const pointer = this.main.eventHandler.pointer;
    if (pointer.active) {
      this.main.cube.rotation.x = pointer.activated.cube.x +
        (pointer.activated.y - pointer.current.y);
      this.main.cube.rotation.y = pointer.activated.cube.y -
        (pointer.activated.x - pointer.current.x);
      this.main.cube.updateMatrixWorld();
      this.main.cubes.updateMatrixWorld();
    }
  }

  private controlFaceRotation () {
    if (this.activeFaceRotation || !this.main.cubes.hasSelection()) { return; }
    const freshKeys = this.main.eventHandler.keys.filter(key => !key.stale);
    freshKeys.forEach(k => {
      k.stale = true;
      if (['ArrowLeft', 'ArrowDown'].includes(k.key)) {
        this.activeFaceRotation = this.main.cubes.initFaceRotation('ccw');
      }
      if (['ArrowRight', 'ArrowUp'].includes(k.key)) {
        this.activeFaceRotation = this.main.cubes.initFaceRotation('cw');
      }
    });
  }

  private animateFaceRotation () {
    if (this.activeFaceRotation) {
      this.activeFaceRotation = this.main.cubes.rotateFace(this.activeFaceRotation);
    }
  }
}
