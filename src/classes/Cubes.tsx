import {
  BoxGeometry,
  Group,
  Object3D,
  TextureLoader,
  MathUtils,
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
    for (let x = -1; x < 2; x++) {
      for (let y = -1; y < 2; y++) {
        for (let z = -1; z < 2; z++) {
          const cube = new Mesh(geometry, [
            this.faceTexture.blue,
            this.faceTexture.green,
            this.faceTexture.yellow,
            this.faceTexture.white,
            this.faceTexture.orange,
            this.faceTexture.red,
          ]);
          cube.position.set(x, y, z);
          this.cubes.push(cube);
          this.all.add(cube);
        }
      }
    }

    // this.all.rotation.x = 0.41;
    // this.all.rotation.y = 2.14;
    scene.add(this.all);

    const pivot = new Object3D();
    pivot.rotation.set(0,0,0);
    const sideCubes = this.cubes.filter(cube => cube.position.y === 1);
    sideCubes.forEach(cube => {
      pivot.attach(cube);
    });
    pivot.rotation.y = MathUtils.degToRad(180);
    sideCubes.forEach(cube => {
      this.all.attach(cube);
    });
  }
}
