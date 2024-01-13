export type RgbColor = {
  red: number;
  green: number;
  blue: number;
};

export type RgbaColor = {
  red: number;
  green: number;
  blue: number;
  alpha: number;
};

export function rgbaColorToArray(color: RgbaColor): Float32Array {
  return new Float32Array([color.red, color.green, color.blue, color.alpha]);
}

export function rgbColorToArray(color: RgbColor): Float32Array {
  return new Float32Array([color.red, color.green, color.blue]);
}
