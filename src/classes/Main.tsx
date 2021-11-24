import {
  Color,
  EventDispatcher,
  Group,
  HemisphereLight,
  PerspectiveCamera,
  Raycaster,
  Scene,
  WebGLRenderer,
} from 'three';
import { EventHandler } from './EventHandler';
import { Cubes } from './Cubes';

export class Main {
  public camera: PerspectiveCamera;
  public cube: Group;
  public cubes: Cubes;
  public raycaster: Raycaster;
  public renderer: WebGLRenderer;
  public scene: Scene;
  public light: HemisphereLight;
  public dispatcher: EventDispatcher;
  public eventHandler: EventHandler;
  constructor () {
    this.scene = new Scene();
    this.scene.background = new Color(0x242424);
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    this.renderer = new WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.cubes = new Cubes(this.scene);
    this.cube = this.cubes.all;
    this.light = new HemisphereLight(0xFFFFFF, 0xDDDDDD, 1);
    this.raycaster = new Raycaster();
    this.scene.add(this.light);
    this.camera.position.z = 6;
    this.camera.updateMatrixWorld();
    this.dispatcher = new EventDispatcher();
    this.eventHandler = new EventHandler(this);
  }
}
