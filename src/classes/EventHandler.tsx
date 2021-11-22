import { Main } from './Main';
import { MouseEventHandler } from './MouseEventHandler';
import { TouchEventHandler } from './TouchEventHandler';
import { WindowResizeEventHandler } from './WindowResizeEventHandler';

export class EventHandler {

  public pointer: {
    /* Denotes when pointer (mouse or touch) is active (clicked or touched) */
    active: boolean;
    /* Current x and y coordinates of the pointer in relation to the canvas */
    current: {
      x: number;
      y: number;
    };
    /* State when the pointer last became active */
    activated: {
      cube: {
        x: number;
        y: number;
      };
      x: number;
      y: number;
    },
  } = {
    active: false,
    current: {
      x: 0,
      y: 0,
    },
    activated: {
      cube: {
        x: 0,
        y: 0,
      },
      x: 0,
      y: 0,
    },
  };

  public main: Main;
  private mouseHandler: MouseEventHandler;
  private touchHandler: TouchEventHandler;
  private resizeHandler: WindowResizeEventHandler;

  constructor (main: Main) {
    this.main = main;
    this.mouseHandler = new MouseEventHandler(this);
    this.touchHandler = new TouchEventHandler(this);
    this.resizeHandler = new WindowResizeEventHandler(this);
  }

}
