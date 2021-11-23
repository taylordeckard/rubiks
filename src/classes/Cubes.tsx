import {
  BoxGeometry,
  Group,
  Intersection,
  Object3D,
  TextureLoader,
  MathUtils,
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

interface FaceTextures {
    blue: MeshStandardMaterial;
    green: MeshStandardMaterial;
    orange: MeshStandardMaterial;
    red: MeshStandardMaterial;
    white: MeshStandardMaterial;
    yellow: MeshStandardMaterial;
}

export interface FaceRotation {
  current: number;
  selection: Mesh[];
  direction: 'cw' | 'ccw';
  axis: 'x' | 'y' | 'z';
}


export class Cubes {
  private activeFaceTextures: FaceTextures;
  private inactiveFaceTextures: FaceTextures;
  private cubes: Mesh[] = [];
  private cubeFaceMap: { [key: string]: { [key: number]: number } } = {};
  private selection: Mesh[] = [];
  private selectedFace: RubiksFace | undefined;
  public all: Group;
  constructor (scene: Scene) {
    const loader = new TextureLoader();
    loader.setPath( 'textures/' );
    this.activeFaceTextures = {
      blue: new MeshStandardMaterial({ map: loader.load('face_blue_active.png') }),
      red: new MeshStandardMaterial({ map: loader.load('face_red_active.png') }),
      orange: new MeshStandardMaterial({ map: loader.load('face_orange_active.png') }),
      white: new MeshStandardMaterial({ map: loader.load('face_white_active.png') }),
      green: new MeshStandardMaterial({ map: loader.load('face_green_active.png') }),
      yellow: new MeshStandardMaterial({ map: loader.load('face_yellow_active.png') }),
    };
    this.inactiveFaceTextures = {
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
          const cube = new Mesh(geometry, this.getFaceTextures());
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

  }

  private getFaceTextures (active = false) {
    return active ? [
      this.activeFaceTextures.blue, // right
      this.activeFaceTextures.green, // left
      this.activeFaceTextures.yellow, // top 
      this.activeFaceTextures.white, // bottom
      this.activeFaceTextures.orange, // front
      this.activeFaceTextures.red, // back
    ] : [
      this.inactiveFaceTextures.blue, // right
      this.inactiveFaceTextures.green, // left
      this.inactiveFaceTextures.yellow, // top 
      this.inactiveFaceTextures.white, // bottom
      this.inactiveFaceTextures.orange, // front
      this.inactiveFaceTextures.red, // back
    ];
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

  private getSelectedFaceAxis (): 'x' | 'y' | 'z' {
    switch (this.selectedFace) {
    case RubiksFace.RIGHT:
    case RubiksFace.LEFT:
      return 'x';
    case RubiksFace.TOP:
    case RubiksFace.BOTTOM:
      return 'y';
    case RubiksFace.FRONT:
    case RubiksFace.BACK:
      return 'z';
    default:
      return 'x';
    }
  }

  public updateMatrixWorld () {
    this.cubes.forEach(cube => cube.updateMatrixWorld());
  }

  public selectCubes (cubes: Mesh[], faceIndex: number) {
    cubes.forEach(c => c.material = this.getFaceTextures(true));
    this.selection = cubes;
    this.selectedFace = faceIndex;
  }

  public deselectAllCubes () {
    this.cubes.forEach(c => c.material = this.getFaceTextures(false));
    this.selection = [];
    this.selectedFace = undefined;
  }

  public hasSelection () {
    return this.selection.length !== 0;
  }

  /**
   * Returns 9 cubes representing a side, given a clicked cube and face
   */
  public getSideByCubeFace (selection: Intersection) {
    const cubeId = selection.object.uuid;
    const clickedFaceId = this.getFaceFromFaceId(selection.faceIndex as number);
    const globalFaceId = this.cubeFaceMap[cubeId][clickedFaceId];
    return {
      sideCubes: this.getCubesByFace(globalFaceId),
      faceIndex: globalFaceId,
    };
  }

  public initFaceRotation (direction: 'cw' | 'ccw') {
    return {
      direction,
      current: 0,
      selection: this.selection,
      axis: this.getSelectedFaceAxis(),
    };
  }

  public rotateFace (faceRotation: FaceRotation) {
    const pivot = new Object3D();
    pivot.position.set(0, 0, 0);
    const current = faceRotation.direction === 'cw'
      ? faceRotation.current - 1
      : faceRotation.current + 1;
    if (Math.abs(faceRotation.current) === 90) {
      return undefined;
    }
    faceRotation.selection.forEach(cube => pivot.attach(cube));
    pivot.rotateZ(MathUtils.degToRad(faceRotation.current));
    faceRotation.selection.forEach(cube => this.all.attach(cube));
    return {
      ...faceRotation,
      current,
    };
  }

}
