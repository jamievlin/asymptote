import { RgbaColor, rgbaColorToArray } from "./ColorTypes";
import IUniformSettable from "./IUniformSettable";

export default class Material implements IUniformSettable {
  constructor(
    private readonly diffuse: RgbaColor,
    private readonly emissive: RgbaColor,
    private readonly specular: RgbaColor,
    private readonly shininess: number,
    private readonly metallic: number,
    private readonly fresnel0: number,
  ) {}

  setUniform(gl: WebGLRenderingContext, program: WebGLProgram, index: number) {
    const getLoc = (param: string) =>
      gl.getUniformLocation(program, "Materials[" + index + "]." + param);

    gl.uniform4fv(getLoc("diffuse"), rgbaColorToArray(this.diffuse));
    gl.uniform4fv(getLoc("emissive"), rgbaColorToArray(this.emissive));
    gl.uniform4fv(getLoc("specular"), rgbaColorToArray(this.specular));

    gl.uniform4f(
      getLoc("parameters"),
      this.shininess,
      this.metallic,
      this.fresnel0,
      0,
    );
  }
}
