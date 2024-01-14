export type Vector3 = {
  x: number;
  y: number;
  z: number;
};

export function vec3(x: number, y: number, z: number): Vector3 {
  return { x, y, z };
}

export function v3ToArray(color: Vector3): Float32Array {
  return new Float32Array([color.x, color.y, color.z]);
}

export type Vector2 = {
  x: number;
  y: number;
};

export function vec2(x: number, y: number): Vector2 {
  return { x, y };
}
