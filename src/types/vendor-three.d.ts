// Khai báo kiểu tối thiểu cho các module runtime không ship kiểu:
//  - three 0.185: build .js thuần, không kèm .d.ts (đã kiểm package.json).
//    Chỉ mô tả đúng phần API mà src/scripts/exploded3d.ts sử dụng.
//  - Pagefind runtime sinh lúc build (/pagefind/*.js).
// Thay thế lâu dài khi được duyệt: cài @types/three (devDependency) rồi xóa
// phần khai báo 'three' dưới đây.

declare module 'three' {
  export class Vector3 {
    x: number;
    y: number;
    z: number;
    constructor(x?: number, y?: number, z?: number);
    set(x: number, y: number, z: number): this;
    copy(v: Vector3): this;
    clone(): Vector3;
    normalize(): this;
    lerpVectors(a: Vector3, b: Vector3, t: number): this;
    add(v: Vector3): this;
    sub(v: Vector3): this;
    clamp(min: Vector3, max: Vector3): this;
    setLength(length: number): this;
    setFromSpherical(s: Spherical): this;
    multiplyScalar(scalar: number): this;
    length(): number;
    lengthSq(): number;
  }
  export class Vector2 {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    set(x: number, y: number): this;
  }
  export class Spherical {
    radius: number;
    phi: number;
    theta: number;
    set(radius: number, phi: number, theta: number): this;
    setFromVector3(v: Vector3): this;
  }
  export interface Object3D {
    userData: Record<string, unknown>;
    position: Vector3;
    rotation: { x: number; y: number; z: number };
    scale: Vector3;
    children: Object3D[];
    add(...objects: Object3D[]): this;
    remove(...objects: Object3D[]): this;
    traverse(callback: (obj: Object3D) => void): void;
  }
  export class Scene implements Object3D {
    userData: Record<string, unknown>;
    position: Vector3;
    rotation: { x: number; y: number; z: number };
    scale: Vector3;
    children: Object3D[];
    add(...objects: Object3D[]): this;
    remove(...objects: Object3D[]): this;
    traverse(callback: (obj: Object3D) => void): void;
  }
  export class Group implements Object3D {
    userData: Record<string, unknown>;
    position: Vector3;
    rotation: { x: number; y: number; z: number };
    scale: Vector3;
    children: Object3D[];
    add(...objects: Object3D[]): this;
    remove(...objects: Object3D[]): this;
    traverse(callback: (obj: Object3D) => void): void;
  }
  export interface BufferGeometry {
    dispose(): void;
    computeVertexNormals(): void;
    setAttribute(name: string, attribute: unknown): this;
  }
  export type Material = MeshStandardMaterial;
  export interface MeshStandardMaterialParameters {
    color?: number | string;
    metalness?: number;
    roughness?: number;
    transparent?: boolean;
    opacity?: number;
    depthWrite?: boolean;
  }
  export interface Color {
    setHex(hex: number, colorSpace?: string): this;
    getHex(colorSpace?: string): number;
  }
  export class MeshStandardMaterial {
    color: Color;
    emissive: Color;
    emissiveIntensity: number;
    metalness: number;
    roughness: number;
    transparent: boolean;
    opacity: number;
    constructor(params?: MeshStandardMaterialParameters);
    dispose(): void;
  }
  export class Mesh implements Object3D {
    userData: Record<string, unknown>;
    geometry: BufferGeometry;
    material: Material;
    position: Vector3;
    rotation: { x: number; y: number; z: number };
    scale: Vector3;
    children: Object3D[];
    add(...objects: Object3D[]): this;
    remove(...objects: Object3D[]): this;
    traverse(callback: (obj: Object3D) => void): void;
    constructor(geometry?: BufferGeometry, material?: Material);
  }
  export class CylinderGeometry implements BufferGeometry {
    dispose(): void;
    computeVertexNormals(): void;
    setAttribute(name: string, attribute: unknown): this;
    constructor(...args: Array<number | boolean>);
  }
  export class BoxGeometry implements BufferGeometry {
    dispose(): void;
    computeVertexNormals(): void;
    setAttribute(name: string, attribute: unknown): this;
    constructor(width?: number, height?: number, depth?: number);
  }
  export class TorusGeometry implements BufferGeometry {
    dispose(): void;
    computeVertexNormals(): void;
    setAttribute(name: string, attribute: unknown): this;
    constructor(radius?: number, tube?: number, radialSegments?: number, tubularSegments?: number);
  }
  export class Box3 {
    min: Vector3;
    max: Vector3;
    isEmpty(): boolean;
    getCenter(target: Vector3): Vector3;
    getSize(target: Vector3): Vector3;
    expandByObject(object: Object3D): this;
  }
  export const MathUtils: {
    degToRad(degrees: number): number;
    clamp(value: number, min: number, max: number): number;
  };
  export class AmbientLight implements Object3D {
    userData: Record<string, unknown>;
    position: Vector3;
    rotation: { x: number; y: number; z: number };
    scale: Vector3;
    children: Object3D[];
    add(...objects: Object3D[]): this;
    remove(...objects: Object3D[]): this;
    traverse(callback: (obj: Object3D) => void): void;
    constructor(color?: number | string, intensity?: number);
  }
  export class DirectionalLight implements Object3D {
    userData: Record<string, unknown>;
    position: Vector3;
    rotation: { x: number; y: number; z: number };
    scale: Vector3;
    children: Object3D[];
    add(...objects: Object3D[]): this;
    remove(...objects: Object3D[]): this;
    traverse(callback: (obj: Object3D) => void): void;
    constructor(color?: number | string, intensity?: number);
  }
  export class PerspectiveCamera implements Object3D {
    fov: number;
    aspect: number;
    userData: Record<string, unknown>;
    position: Vector3;
    rotation: { x: number; y: number; z: number };
    scale: Vector3;
    children: Object3D[];
    add(...objects: Object3D[]): this;
    remove(...objects: Object3D[]): this;
    traverse(callback: (obj: Object3D) => void): void;
    constructor(fov?: number, aspect?: number, near?: number, far?: number);
    lookAt(x: number, y: number, z: number): void;
    updateProjectionMatrix(): void;
  }
  export class WebGLRenderer {
    domElement: HTMLCanvasElement;
    constructor(parameters?: { antialias?: boolean; alpha?: boolean });
    setSize(width: number, height: number): void;
    setPixelRatio(value: number): void;
    render(scene: Object3D, camera: Object3D): void;
    dispose(): void;
    forceContextLoss(): void;
  }
  export class Raycaster {
    setFromCamera(coords: Vector2, camera: Object3D): void;
    intersectObjects(objects: Object3D[], recursive?: boolean): Array<{
      object: Object3D;
      distance: number;
      point: Vector3;
    }>;
  }
}

declare module 'three/addons/controls/OrbitControls.js' {
  import type { Object3D, Vector3 } from 'three';
  export class OrbitControls {
    target: Vector3;
    enableDamping: boolean;
    dampingFactor: number;
    minDistance: number;
    maxDistance: number;
    autoRotate: boolean;
    autoRotateSpeed: number;
    constructor(camera: Object3D, domElement: HTMLElement);
    addEventListener(type: string, listener: (event?: unknown) => void): void;
    update(): boolean;
    dispose(): void;
  }
}
