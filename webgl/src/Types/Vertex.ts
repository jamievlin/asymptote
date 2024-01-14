import { Vector3 } from "./VectorTypes";
import { RgbaColor } from "./ColorTypes";

export type Vertex = {
  position: Vector3;
  normal: Vector3;
  color?: RgbaColor;
};
