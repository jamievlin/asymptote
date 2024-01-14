export enum GeometryMode {
  Triangles,
  Lines,
  Points,
}

export function geometryNodeToGlTypes(
  gl: WebGLRenderingContext,
  mode: GeometryMode,
): number | null {
  switch (mode) {
    case GeometryMode.Triangles:
      return gl.TRIANGLES;
    case GeometryMode.Points:
      return gl.POINTS;
    case GeometryMode.Lines:
      return gl.LINES;
    default:
      return null;
  }
}
