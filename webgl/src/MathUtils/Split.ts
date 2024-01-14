export type SplitReturn = {
  m0: number;
  m2: number;
  m3: number;
  m4: number;
  m5: number;
};

export default function split(
  z0: number,
  c0: number,
  c1: number,
  z1: number,
): SplitReturn {
  const ret: Partial<SplitReturn> = {};

  ret.m0 = 0.5 * (z0 + c0);
  const m1 = 0.5 * (c0 + c1);
  ret.m2 = 0.5 * (c1 + z1);
  ret.m3 = 0.5 * (ret.m0 + m1);
  ret.m4 = 0.5 * (m1 + ret.m2);
  ret.m5 = 0.5 * (ret.m3 + ret.m4);

  return ret as SplitReturn;
}
