import { vec3, Vector3 } from "../Types/VectorTypes";
import { abs2, cross, dot, unit } from "./Helpers";

export type RmfReturn = {
  p: Vector3;
  r: Vector3;
  t: Vector3;
  s: Vector3;
};

function createRmfReturn(p: Vector3, r: Vector3, t: Vector3): RmfReturn {
  return {
    p,
    r,
    t,
    s: cross(t, r),
  };
}

/** Return a unit vector perpendicular to a given unit vector v */
function perp(v: Vector3): Vector3 {
  let u = cross(v, vec3(0, 1, 0));
  const norm = Number.EPSILON * abs2(v);
  if (abs2(u) > norm) return unit(u);
  u = cross(v, vec3(0, 0, 1));
  return abs2(u) > norm ? unit(u) : vec3(1, 0, 0);
}

export default function rmf(
  z0: Vector3,
  c0: Vector3,
  c1: Vector3,
  z1: Vector3,
  t: number[],
) {
  const norm =
    Number.EPSILON * Math.max(abs2(z0), abs2(c0), abs2(c1), abs2(z1));

  // Special case of dir for t in (0,1].
  const dir = (t: number) => {
    if (t == 1) {
      let dir = vec3(z1.x - c1.x, z1.y - c1.y, z1.z - c1.z);
      if (abs2(dir) > norm) return unit(dir);
      dir = vec3(
        2 * c1.x - c0.x - z1.x,
        2 * c1.y - c0.y - z1.y,
        2 * c1.z - c0.z - z1.z,
      );
      if (abs2(dir) > norm) return unit(dir);
      return vec3(
        z1.x - z0.x + 3 * (c0.x - c1.x),
        z1.y - z0.y + 3 * (c0.y - c1.y),
        z1.z - z0.z + 3 * (c0.z - c1.z),
      );
    }
    const a = vec3(
      z1.x - z0.x + 3 * (c0.x - c1.x),
      z1.y - z0.y + 3 * (c0.y - c1.y),
      z1.z - z0.z + 3 * (c0.z - c1.z),
    );
    const b = vec3(
      2 * (z0.x + c1.x) - 4 * c0.x,
      2 * (z0.y + c1.y) - 4 * c0.y,
      2 * (z0.z + c1.z) - 4 * c0.z,
    );
    const c = vec3(c0.x - z0.x, c0.y - z0.y, c0.z - z0.z);
    let t2 = t * t;
    let dir = vec3(
      a.x * t2 + b.x * t + c.x,
      a.y * t2 + b.y * t + c.y,
      a.z * t2 + b.z * t + c.z,
    );
    if (abs2(dir) > norm) return unit(dir);
    t2 = 2 * t;
    dir = vec3(a.x * t2 + b.x, a.y * t2 + b.y, a.z * t2 + b.z);
    if (abs2(dir) > norm) return unit(dir);
    return unit(a);
  };

  const R: RmfReturn[] = Array(t.length);
  let T = vec3(c0.x - z0.x, c0.y - z0.y, c0.z - z0.z);
  if (abs2(T) < norm) {
    T = vec3(
      z0.x - 2 * c0.x + c1.x,
      z0.y - 2 * c0.y + c1.y,
      z0.z - 2 * c0.z + c1.z,
    );
    if (abs2(T) < norm)
      T = vec3(
        z1.x - z0.x + 3 * (c0.x - c1.x),
        z1.y - z0.y + 3 * (c0.y - c1.y),
        z1.z - z0.z + 3 * (c0.z - c1.z),
      );
  }
  T = unit(T);
  const Tp = perp(T);
  R[0] = createRmfReturn(z0, Tp, T);
  for (let i = 1; i < t.length; ++i) {
    const Ri = R[i - 1];
    const s = t[i];
    let onemt = 1 - s;
    let onemt2 = onemt * onemt;
    const onemt3 = onemt2 * onemt;
    const s3 = 3 * s;
    onemt2 *= s3;
    onemt *= s3 * s;
    const t3 = s * s * s;
    const p = vec3(
      onemt3 * z0.x + onemt2 * c0.x + onemt * c1.x + t3 * z1.x,
      onemt3 * z0.y + onemt2 * c0.y + onemt * c1.y + t3 * z1.y,
      onemt3 * z0.z + onemt2 * c0.z + onemt * c1.z + t3 * z1.z,
    );
    const v1 = vec3(p.x - Ri.p.x, p.y - Ri.p.y, p.z - Ri.p.z);
    if (v1.x != 0 || v1.y != 0 || v1.z != 0) {
      const r = Ri.r;
      const u1 = unit(v1);
      let ti = Ri.t;
      const dotu1ti = dot(u1, ti);
      const tp = vec3(
        ti.x - 2 * dotu1ti * u1.x,
        ti.y - 2 * dotu1ti * u1.y,
        ti.z - 2 * dotu1ti * u1.z,
      );
      ti = dir(s);
      const dotu1r2 = 2 * dot(u1, r);
      let rp = vec3(
        r.x - dotu1r2 * u1.x,
        r.y - dotu1r2 * u1.y,
        r.z - dotu1r2 * u1.z,
      );
      const u2 = unit(vec3(ti.x - tp.x, ti.y - tp.y, ti.z - tp.z));
      const dotu2rp2 = 2 * dot(u2, rp);
      rp = vec3(
        rp.x - dotu2rp2 * u2.x,
        rp.y - dotu2rp2 * u2.y,
        rp.z - dotu2rp2 * u2.z,
      );
      R[i] = createRmfReturn(p, unit(rp), unit(ti));
    } else R[i] = R[i - 1];
  }
  return R;
}
