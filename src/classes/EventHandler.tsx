import { Main } from './Main';
import { KeyEventHandler } from './KeyEventHandler';
import { MouseEventHandler } from './MouseEventHandler';
import { TouchEventHandler } from './TouchEventHandler';
import { WindowResizeEventHandler } from './WindowResizeEventHandler';
import { Vector2 } from 'three';

interface Coords2D { x: number; y: number; }
interface ActiveKey {
  /* Key that is currently pressed */
  key: string;
  /* Whether or not the key has been registered by the animator, true if so */
  stale: boolean;
}

export class EventHandler {

  public pointer: {
    /* Denotes when pointer (mouse or touch) is active (clicked or touched) */
    active: boolean;
    /* Current x and y coordinates of the pointer in relation to the canvas */
    current: Vector2;
    /* State when the pointer last became active */
    activated: {
      /* Rubiks cubes rotation when the click/touch occurred */
      cube: Coords2D;
      /* Mouse position when the click/touch occurred */
    } & Coords2D,
  } = {
    active: false,
    current: new Vector2(0, 0),
    activated: {
      cube: {
        x: 0,
        y: 0,
      },
      x: 0,
      y: 0,
    },
  };
  public keys: ActiveKey[] = [];
  
  public main: Main;
  private keyEventHandler: KeyEventHandler;
  private mouseHandler: MouseEventHandler;
  private touchHandler: TouchEventHandler;
  private resizeHandler: WindowResizeEventHandler;

  constructor (main: Main) {
    this.main = main;
    this.keyEventHandler = new KeyEventHandler(this);
    this.mouseHandler = new MouseEventHandler(this);
    this.touchHandler = new TouchEventHandler(this);
    this.resizeHandler = new WindowResizeEventHandler(this);
    document.addEventListener('mouseleave', () => {
      this.pointer.active = false;
    });
  }

}
