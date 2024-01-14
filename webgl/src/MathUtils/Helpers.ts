import { Vector3 } from "../Types/VectorTypes";

export function goodroot(t: number) {
  return 0.0 <= t && t <= 1.0;
}

/** Accurate computation of sqrt(1+x)-1 */
export function sqrt1pxm1(x: number) {
  return x / (Math.sqrt(1.0 + x) + 1.0);
}

/** Calculate the coefficients of a Bezier derivative divided by 3 */
export function derivative(
  z0: number,
  c0: number,
  c1: number,
  z1: number,
): [number, number, number] {
  const a = z1 - z0 + 3.0 * (c0 - c1);
  const b = 2.0 * (z0 + c1) - 4.0 * c0;
  const c = c0 - z0;
  return [a, b, c];
}

export function unit(v: Vector3): Vector3 {
  const norm = 1 / (Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z) || 1);
  return {
    x: v.x * norm,
    y: v.y * norm,
    z: v.z * norm,
  };
}

export function abs2(v: Vector3): number {
  return v.x * v.x + v.y * v.y + v.z * v.z;
}

export function dot(u: Vector3, v: Vector3): number {
  return u.x * v.x + u.y * v.y + u.z * v.z;
}

export function cross(u: Vector3, v: Vector3): Vector3 {
  return {
    x: u.y * v.z - u.z * v.y,
    y: u.z * v.x - u.x * v.z,
    z: u.x * v.y - u.y * v.x,
  };
}
