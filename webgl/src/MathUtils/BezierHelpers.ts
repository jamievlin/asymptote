// Evaluate the Bezier curve defined by a,b,c,d at t.
import { vec3, Vector3 } from "../Types/VectorTypes";

export function bezier(
  a: number,
  b: number,
  c: number,
  d: number,
  t: number,
): number {
  const onemt = 1 - t;
  const onemt2 = onemt * onemt;
  return (
    onemt2 * onemt * a + t * (3.0 * (onemt2 * b + t * onemt * c) + t * t * d)
  );
}

/**
 * Return one-third of the first derivative of the Bezier curve
 * defined by a,b,c,d at t=0
 */
export function bezierP(a: Vector3, b: Vector3): Vector3 {
  return vec3(b.x - a.x, b.y - a.y, b.z - a.z);
}

/**
 * Return one-half of the second derivative of the Bezier curve defined
 * by a,b,c,d at t=0.
 */
export function bezierPP(a: Vector3, b: Vector3, c: Vector3): Vector3 {
  return vec3(
    3 * (a.x + c.x) - 6 * b.x,
    3 * (a.y + c.y) - 6 * b.y,
    3 * (a.z + c.z) - 6 * b.z,
  );
}

/**
 * Return one-sixth of the third derivative of the Bezier curve defined by
 * a,b,c,d at t=0.
 */
export function bezierPPP(
  a: Vector3,
  b: Vector3,
  c: Vector3,
  d: Vector3,
): Vector3 {
  return vec3(
    d.x - a.x + 3 * (b.x - c.x),
    d.y - a.y + 3 * (b.y - c.y),
    d.z - a.z + 3 * (b.z - c.z),
  );
}

/**
 * Return four-thirds of the first derivative of the Bezier curve defined by
 * a,b,c,d at t=1/2.
 */
export function bezierPh(a: Vector3, b: Vector3, c: Vector3, d: Vector3) {
  return vec3(
    c.x + d.x - a.x - b.x,
    c.y + d.y - a.y - b.y,
    c.z + d.z - a.z - b.z,
  );
}

/**
 * Return two-thirds of the second derivative of the Bezier curve defined by
 * a,b,c,d at t=1/2.
 */
export function bezierPPh(
  a: Vector3,
  b: Vector3,
  c: Vector3,
  d: Vector3,
): Vector3 {
  return vec3(
    3 * a.x - 5 * b.x + c.x + d.x,
    3 * a.y - 5 * b.y + c.y + d.y,
    3 * a.z - 5 * b.z + c.z + d.z,
  );
}
