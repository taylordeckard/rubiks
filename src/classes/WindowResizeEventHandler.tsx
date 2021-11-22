import { EventHandler } from './EventHandler';

export class WindowResizeEventHandler {

  constructor (private parent: EventHandler) {
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  private onWindowResize () {
    this.parent.main.camera.aspect = window.innerWidth / window.innerHeight;
    this.parent.main.camera.updateProjectionMatrix();

    this.parent.main.renderer.setSize( window.innerWidth, window.innerHeight );
  }

}
