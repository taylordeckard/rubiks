import {
  BoxGeometry,
  Group,
  TextureLoader,
  Mesh,
  MeshStandardMaterial,
  Scene,
} from 'three';

export class Cubes {
  private faceTexture: {
    blue: MeshStandardMaterial;
    green: MeshStandardMaterial;
    orange: MeshStandardMaterial;
    red: MeshStandardMaterial;
    white: MeshStandardMaterial;
    yellow: MeshStandardMaterial;
  };
  private cubes: Mesh[] = [];
  public all: Group;
  constructor (scene: Scene) {
    const loader = new TextureLoader();
    loader.setPath( 'textures/' );
    this.faceTexture = {
      blue: new MeshStandardMaterial({ map: loader.load('face_blue.png') }),
      red: new MeshStandardMaterial({ map: loader.load('face_red.png') }),
      orange: new MeshStandardMaterial({ map: loader.load('face_orange.png') }),
      white: new MeshStandardMaterial({ map: loader.load('face_white.png') }),
      green: new MeshStandardMaterial({ map: loader.load('face_green.png') }),
      yellow: new MeshStandardMaterial({ map: loader.load('face_yellow.png') }),
    };
    const geometry = new BoxGeometry();
    this.all = new Group();
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        for (let k = -1; k < 2; k++) {
          const cube = new Mesh(geometry, [
            this.faceTexture.blue,
            this.faceTexture.green,
            this.faceTexture.yellow,
            this.faceTexture.white,
            this.faceTexture.orange,
            this.faceTexture.red,
          ]);
          cube.position.set(i, j, k);
          this.cubes.push(cube);
          this.all.add(cube);
        }
      }
    }
    this.all.rotation.x = 0.41;
    this.all.rotation.y = 2.14;
    scene.add(this.all);
  }
}
