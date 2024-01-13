export default interface IUniformSettable {
  setUniform(
    gl: WebGLRenderingContext,
    program: WebGLProgram,
    index: number,
  ): void;
}
