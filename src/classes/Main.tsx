import {
  BoxGeometry,
  HemisphereLight,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';
import { MouseHandler } from './MouseHandler';

export class Main {
  public camera: PerspectiveCamera;
  public cube: Mesh;
  public renderer: WebGLRenderer;
  public scene: Scene;
  public light: HemisphereLight;
  public mouseHandler: MouseHandler;
  constructor () {
    this.scene = new Scene();
    this.camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    this.renderer = new WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    const geometry = new BoxGeometry();
    const material = new MeshStandardMaterial( { color: 0x00C392 } );
    this.cube = new Mesh(geometry, material);
    this.light = new HemisphereLight(0xFFFFFF, 0x404040, 1);
    this.scene.add(this.cube);
    this.scene.add(this.light);
    this.camera.position.z = 2;
    this.mouseHandler = new MouseHandler(this);
  }
}
