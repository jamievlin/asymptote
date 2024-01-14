import { vec3, Vector2, Vector3 } from "../Types/VectorTypes";

export default class Align {
  private readonly ct?: number;
  private readonly st?: number;
  private readonly cp?: number;
  private readonly sp?: number;

  constructor(
    private readonly center: Vector3,
    dir: Vector2,
  ) {
    this.center = center;
    if (dir) {
      const theta = dir.x;
      const phi = dir.y;

      this.ct = Math.cos(theta);
      this.st = Math.sin(theta);
      this.cp = Math.cos(phi);
      this.sp = Math.sin(phi);
    }
  }

  public T0(v: Vector3): Vector3 {
    return vec3(v.x + this.center.x, v.y + this.center.y, v.z + this.center.z);
  }

  public T(v: Vector3): Vector3 {
    if (
      this.ct !== undefined &&
      this.st !== undefined &&
      this.cp !== undefined &&
      this.sp !== undefined
    ) {
      const x = v.x;
      const Y = v.y;
      const z = v.z;
      const X = x * this.ct + z * this.st;
      return vec3(
        X * this.cp - Y * this.sp + this.center.x,
        X * this.sp + Y * this.cp + this.center.y,
        -x * this.st + z * this.ct + this.center.z,
      );
    } else {
      console.error("Attempt to call T without specified dir");
      return vec3(NaN, NaN, NaN);
    }
  }
}
