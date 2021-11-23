import {
  BoxGeometry,
  Group,
  Intersection,
  // Object3D,
  TextureLoader,
  Material,
  // MathUtils,
  Mesh,
  MeshStandardMaterial,
  Scene,
} from 'three';

export enum RubiksFace {
  RIGHT = 0,
  LEFT = 1,
  TOP = 2,
  BOTTOM = 3,
  FRONT = 4,
  BACK = 5,
}

export class Cubes {
  private faceTexture: {
    blue: () => MeshStandardMaterial;
    green: () => MeshStandardMaterial;
    orange: () => MeshStandardMaterial;
    red: () => MeshStandardMaterial;
    white: () => MeshStandardMaterial;
    yellow: () => MeshStandardMaterial;
  };
  private cubes: Mesh[] = [];
  private cubeFaceMap: { [key: string]: { [key: number]: number } } = {};
  public all: Group;
  constructor (scene: Scene) {
    const loader = new TextureLoader();
    loader.setPath( 'textures/' );
    this.faceTexture = {
      blue: () => new MeshStandardMaterial({ map: loader.load('face_blue.png') }),
      red: () => new MeshStandardMaterial({ map: loader.load('face_red.png') }),
      orange: () => new MeshStandardMaterial({ map: loader.load('face_orange.png') }),
      white: () => new MeshStandardMaterial({ map: loader.load('face_white.png') }),
      green: () => new MeshStandardMaterial({ map: loader.load('face_green.png') }),
      yellow: () => new MeshStandardMaterial({ map: loader.load('face_yellow.png') }),
    };
    const geometry = new BoxGeometry();
    this.all = new Group();
    for (let x = -1; x < 2; x++) {
      for (let y = -1; y < 2; y++) {
        for (let z = -1; z < 2; z++) {
          const cube = new Mesh(geometry, [
            this.faceTexture.blue(), // right
            this.faceTexture.green(), // left
            this.faceTexture.yellow(), // top 
            this.faceTexture.white(), // bottom
            this.faceTexture.orange(), // front
            this.faceTexture.red(), // back
          ]);
          cube.position.set(x, y, z);
          this.cubes.push(cube);
          this.cubeFaceMap[cube.uuid] = {};
          if (x === -1) {
            this.cubeFaceMap[cube.uuid][1] = 1;
          }
          if (x === 1) {
            this.cubeFaceMap[cube.uuid][0] = 0;
          }
          if (y === -1) {
            this.cubeFaceMap[cube.uuid][3] = 3;
          }
          if (y === 1) {
            this.cubeFaceMap[cube.uuid][2] = 2;
          }
          if (z === -1) {
            this.cubeFaceMap[cube.uuid][5] = 5;
          }
          if (z === 1) {
            this.cubeFaceMap[cube.uuid][4] = 4;
          }
          this.all.add(cube);
        }
      }
    }

    // this.all.rotation.x = 0.41;
    // this.all.rotation.y = 2.14;
    scene.add(this.all);

    // const pivot = new Object3D();
    // pivot.rotation.set(0,0,0);
    // const sideCubes = this.cubes.filter(cube => cube.position.y === 1);
    // sideCubes.forEach(cube => {
    //   pivot.attach(cube);
    // });
    // pivot.rotation.y = MathUtils.degToRad(180);
    // sideCubes.forEach(cube => {
    //   this.all.attach(cube);
    // });
  }

  private getFaceFromFaceId (faceId: number) {
    return Math.floor(faceId / 2);
  }

  private getCubesByFace (faceId: RubiksFace) {
    return this.cubes.reduce((memo, cube) => {
      if (Object.values(this.cubeFaceMap[cube.uuid]).includes(faceId)) {
        memo.push(cube);
      }
      return memo;
    }, [] as Mesh[]);
  }

  public selectCubes (cubes: Mesh[]) {
    cubes.forEach(c => {
      (c.material as Material[]).forEach(m => {
        m.transparent = true;
        m.opacity = 0.8;
      });
    });
  }

  public deselectAllCubes () {
    this.cubes.forEach(c => (c.material as Material[]).forEach(m => m.transparent = false));
  }

  /**
   * Returns 9 cubes representing a side, given a clicked cube and face
   */
  public getSideByCubeFace (selection: Intersection) {
    const cubeId = selection.object.uuid;
    const clickedFaceId = this.getFaceFromFaceId(selection.faceIndex as number);
    const globalFaceId = this.cubeFaceMap[cubeId][clickedFaceId];
    return this.getCubesByFace(globalFaceId);
  }


}
