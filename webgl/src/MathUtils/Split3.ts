import { Vector3 } from "../Types/VectorTypes";

export type Split3Points = {
  m0: Vector3;
  m2: Vector3;
  m3: Vector3;
  m4: Vector3;
  m5: Vector3;
};

export default function split3(
  z0: Vector3,
  c0: Vector3,
  c1: Vector3,
  z1: Vector3,
): Split3Points {
  const ret: Partial<Split3Points> = {};
  ret.m0 = {
    x: 0.5 * (z0.x + c0.x),
    y: 0.5 * (z0.y + c0.y),
    z: 0.5 * (z0.z + c0.z),
  };
  const m1_0 = 0.5 * (c0.x + c1.x);
  const m1_1 = 0.5 * (c0.y + c1.y);
  const m1_2 = 0.5 * (c0.z + c1.z);
  ret.m2 = {
    x: 0.5 * (c1.x + z1.x),
    y: 0.5 * (c1.y + z1.y),
    z: 0.5 * (c1.z + z1.z),
  };
  ret.m3 = {
    x: 0.5 * (ret.m0.x + m1_0),
    y: 0.5 * (ret.m0.y + m1_1),
    z: 0.5 * (ret.m0.z + m1_2),
  };
  ret.m4 = {
    x: 0.5 * (m1_0 + ret.m2.x),
    y: 0.5 * (m1_1 + ret.m2.y),
    z: 0.5 * (m1_2 + ret.m2.z),
  };
  ret.m5 = {
    x: 0.5 * (ret.m3.x + ret.m4.x),
    y: 0.5 * (ret.m3.y + ret.m4.y),
    z: 0.5 * (ret.m3.z + ret.m4.z),
  };

  return ret as Split3Points;
}
