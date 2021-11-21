import {
  Color,
  Group,
  HemisphereLight,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';
import { MouseHandler } from './MouseHandler';
import { Cubes } from './Cubes';

export class Main {
  public camera: PerspectiveCamera;
  public cube: Group;
  public cubes: Cubes;
  public renderer: WebGLRenderer;
  public scene: Scene;
  public light: HemisphereLight;
  public mouseHandler: MouseHandler;
  constructor () {
    this.scene = new Scene();
    this.scene.background = new Color(0x242424);
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.cubes = new Cubes(this.scene);
    this.cube = this.cubes.all;
    this.light = new HemisphereLight(0xFFFFFF, 0xDDDDDD, 1);
    this.scene.add(this.light);
    this.camera.position.z = 6;
    this.mouseHandler = new MouseHandler(this);
  }
}
