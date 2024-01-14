import { abs2, cross, unit } from "./Helpers";
import { third } from "./Constants";
import { vec3, Vector3 } from "../Types/VectorTypes";
import { Box } from "../Types/BoxType";

/**
 * Return the maximum distance squared of points c0 and c1 from
 * the respective internal control points of z0--z1.
 */
export function Straightness(
  z0: Vector3,
  c0: Vector3,
  c1: Vector3,
  z1: Vector3,
): number {
  const v = vec3(
    third * (z1.x - z0.x),
    third * (z1.y - z0.y),
    third * (z1.z - z0.z),
  );
  return Math.max(
    abs2(vec3(c0.x - v.x - z0.x, c0.y - v.y - z0.y, c0.z - v.z - z0.z)),
    abs2(vec3(z1.x - v.x - c1.x, z1.y - v.y - c1.y, z1.z - v.z - c1.z)),
  );
}

/** Return one ninth of the relative flatness squared of a--b and c--d. */
export function Flatness(a: Vector3, b: Vector3, c: Vector3, d: Vector3) {
  const u = vec3(b.x - a.x, b.y - a.y, b.z - a.z);
  const v = vec3(d.x - c.x, d.y - c.y, d.z - c.z);
  return Math.max(abs2(cross(u, unit(v))), abs2(cross(v, unit(u)))) / 9;
}

/** Return the vertices of the box containing 3d points m and M */
export function corners(m: Vector3, M: Vector3): Box {
  return [
    m,
    vec3(m.x, m.y, M.z),
    vec3(m.x, M.y, m.z),
    vec3(m.x, M.y, M.z),
    vec3(M.x, m.y, m.z),
    vec3(M.x, m.y, M.z),
    vec3(M.x, M.y, m.z),
    M,
  ];
}

export function minbound(v: Box): Vector3 {
  return vec3(
    Math.min(v[0].x, v[1].x, v[2].x, v[3].x, v[4].x, v[5].x, v[6].x, v[7].x),
    Math.min(v[0].y, v[1].y, v[2].y, v[3].y, v[4].y, v[5].y, v[6].y, v[7].y),
    Math.min(v[0].z, v[1].z, v[2].z, v[3].z, v[4].z, v[5].z, v[6].z, v[7].z),
  );
}

export function maxbound(v: Box): Vector3 {
  return vec3(
    Math.max(v[0].x, v[1].x, v[2].x, v[3].x, v[4].x, v[6].x, v[5].x, v[7].x),
    Math.max(v[0].y, v[1].y, v[2].y, v[3].y, v[4].y, v[5].y, v[6].y, v[7].y),
    Math.max(v[0].z, v[1].z, v[2].z, v[3].z, v[4].z, v[5].z, v[6].z, v[7].z),
  );
}
