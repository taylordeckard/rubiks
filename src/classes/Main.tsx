import {
  BoxGeometry,
  Color,
  TextureLoader,
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
    const loader = new TextureLoader();
    loader.setPath( 'textures/' );
    const blueTexture = loader.load('face_blue.png');
    const redTexture = loader.load('face_red.png');
    const orangeTexture = loader.load('face_orange.png');
    const whiteTexture = loader.load('face_white.png');
    const greenTexture = loader.load('face_green.png');
    const yellowTexture = loader.load('face_yellow.png');
    this.scene = new Scene();
    this.scene.background = new Color(0x242424);
    this.camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    this.renderer = new WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    const geometry = new BoxGeometry();
    const blueFace = new MeshStandardMaterial( {  map: blueTexture } );
    const redFace = new MeshStandardMaterial( {  map: redTexture } );
    const orangeFace = new MeshStandardMaterial( {  map: orangeTexture } );
    const whiteFace = new MeshStandardMaterial( {  map: whiteTexture } );
    const greenFace = new MeshStandardMaterial( {  map: greenTexture } );
    const yellowFace = new MeshStandardMaterial( {  map: yellowTexture } );
    this.cube = new Mesh(geometry, [blueFace, redFace, orangeFace, whiteFace, greenFace, yellowFace]);
    this.light = new HemisphereLight(0xFFFFFF, 0xDDDDDD, 1);
    this.scene.add(this.cube);
    this.scene.add(this.light);
    this.camera.position.z = 2;
    this.mouseHandler = new MouseHandler(this);
  }
}
