export type Vector3 = {
  x: number;
  y: number;
  z: number;
};

export function v3ToArray(color: Vector3): Float32Array {
  return new Float32Array([color.x, color.y, color.z]);
}
