import { v3ToArray, Vector3 } from "./Types/VectorTypes";
import { RgbColor, rgbColorToArray } from "./Types/ColorTypes";
import IUniformSettable from "./IUniformSettable";

export default class Light implements IUniformSettable {
  constructor(
    private readonly direction: Vector3,
    private readonly color: RgbColor,
  ) {}

  setUniform(gl: WebGLRenderingContext, program: WebGLProgram, index: number) {
    const getLoc = (param: string) =>
      gl.getUniformLocation(program, "Lights[" + index + "]." + param);

    gl.uniform3fv(getLoc("direction"), v3ToArray(this.direction));
    gl.uniform3fv(getLoc("color"), rgbColorToArray(this.color));
  }
}
