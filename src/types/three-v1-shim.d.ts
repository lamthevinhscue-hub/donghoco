// =============================================================================
// three-v1-shim.d.ts — Bổ sung khai báo kiểu cho three 0.185.1 (V1)
// =============================================================================
// Gói npm three 0.185.1 KHÔNG kèm tệp .d.ts và dự án KHÔNG dùng @types/three
// (không thêm dependency theo phạm vi gói V1). TypeScript suy kiểu trực tiếp
// từ three.core.js/three.module.js — nhưng suy kiểu shallow này thiếu một số
// export và property mà V1 dùng. Tệp này CHỈ bổ sung khai báo kiểu cho những
// phần thiếu; không đổi bất kỳ hành vi runtime nào.
// =============================================================================

declare module 'three' {
  // ---- Hình học V1: bánh răng có răng + dây tóc xoắn ----
  export class Shape {
    constructor();
    moveTo(x: number, y: number): this;
    lineTo(x: number, y: number): this;
    closePath(): this;
    holes: Path[];
  }
  export class Path {
    constructor();
    absarc(x: number, y: number, banKinh: number, gocDau: number, gocCuoi: number, nguocChieuKim: boolean): this;
  }
  export class ExtrudeGeometry {
    constructor(
      hinh: Shape,
      tuyChon?: {
        depth?: number;
        bevelEnabled?: boolean;
        bevelThickness?: number;
        bevelSize?: number;
        bevelSegments?: number;
        curveSegments?: number;
      },
    );
    rotateX(goc: number): this;
    translate(x: number, y: number, z: number): this;
    dispose(): void;
  }
  export class CatmullRomCurve3 {
    constructor(diem: Vector3[], khepKin?: boolean, loai?: string, doCang?: number);
  }
  export class TubeGeometry {
    constructor(
      duong: CatmullRomCurve3,
      soDoan?: number,
      banKinhDay?: number,
      soCanh?: number,
      khepKin?: boolean,
    );
    dispose(): void;
  }
  export class SphereGeometry {
    constructor(banKinh?: number, soDoanNgang?: number, soDoanDoc?: number);
    dispose(): void;
  }

  // ---- Vật liệu và ánh sáng V1 ----
  export class MeshPhysicalMaterial extends MeshStandardMaterial {
    constructor(tuyChon?: {
      color?: number;
      metalness?: number;
      roughness?: number;
      transparent?: boolean;
      opacity?: number;
      clearcoat?: number;
      clearcoatRoughness?: number;
      ior?: number;
      depthWrite?: boolean;
    });
  }
  export class PointLight {
    constructor(mau?: number, cuongDo?: number, khoangCach?: number, giam?: number);
    position: Vector3;
  }
  export const PCFShadowMap: number;

  // ---- Môi trường phản xạ PMREM ----
  export class PMREMGenerator {
    constructor(renderer: WebGLRenderer);
    fromScene(canh: unknown, sigma?: number): { texture: unknown };
    dispose(): void;
  }

  // ---- Property đổ bóng / môi trường (không xuất hiện trong suy kiểu JS) ----
  export interface Mesh {
    castShadow: boolean;
    receiveShadow: boolean;
  }
  export interface DirectionalLight {
    castShadow: boolean;
    shadow: {
      mapSize: { set(rong: number, cao: number): void };
      camera: {
        left: number;
        right: number;
        top: number;
        bottom: number;
        near: number;
        far: number;
      };
      bias: number;
    };
  }
  export interface WebGLRenderer {
    shadowMap: { enabled: boolean; type: number };
  }
  export interface Scene {
    environment: unknown;
  }
}

// ---- Addons: môi trường phản xạ dựng nội bộ (không tải tài sản ngoài) ----
declare module 'three/addons/environments/RoomEnvironment.js' {
  export class RoomEnvironment {
    constructor();
  }
}
