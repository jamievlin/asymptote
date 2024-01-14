export type BezierTriangleControlpoints = {
  l003: number;
  l102: number;
  l012: number;
  l111: number;
  r300: number;
  r210: number;
  r111: number;
  u030: number;
  u021: number;
  u120: number;
  u111: number;
  c111: number;
  r201: number;
  u012: number;
  l021: number;
  u210: number;
  r120: number;
  l201: number;
  r102: number;
  l210: number;
  r012: number;
  l300: number;
  r021: number;
  u201: number;
  r030: number;
  u102: number;
  l120: number;
  l030: number;
};

export default function splitTriangles(
  p: number[],
): BezierTriangleControlpoints {
  const ret: Partial<BezierTriangleControlpoints> = {};

  ret.l003 = p[0];
  const p102 = p[1];
  const p012 = p[2];
  const p201 = p[3];
  const p111 = p[4];
  const p021 = p[5];
  ret.r300 = p[6];
  const p210 = p[7];
  const p120 = p[8];
  ret.u030 = p[9];

  ret.u021 = 0.5 * (ret.u030 + p021);
  ret.u120 = 0.5 * (ret.u030 + p120);

  const p033 = 0.5 * (p021 + p012);
  const p231 = 0.5 * (p120 + p111);
  const p330 = 0.5 * (p120 + p210);

  const p123 = 0.5 * (p012 + p111);

  ret.l012 = 0.5 * (p012 + ret.l003);
  const p312 = 0.5 * (p111 + p201);
  ret.r210 = 0.5 * (p210 + ret.r300);

  ret.l102 = 0.5 * (ret.l003 + p102);
  const p303 = 0.5 * (p102 + p201);
  ret.r201 = 0.5 * (p201 + ret.r300);

  ret.u012 = 0.5 * (ret.u021 + p033);
  ret.u210 = 0.5 * (ret.u120 + p330);
  ret.l021 = 0.5 * (p033 + ret.l012);
  const p4xx = 0.5 * p231 + 0.25 * (p111 + p102);
  ret.r120 = 0.5 * (p330 + ret.r210);
  const px4x = 0.5 * p123 + 0.25 * (p111 + p210);
  const pxx4 = 0.25 * (p021 + p111) + 0.5 * p312;
  ret.l201 = 0.5 * (ret.l102 + p303);
  ret.r102 = 0.5 * (p303 + ret.r201);

  ret.l210 = 0.5 * (px4x + ret.l201); // = m120
  ret.r012 = 0.5 * (px4x + ret.r102); // = m021
  ret.l300 = 0.5 * (ret.l201 + ret.r102); // = r003 = m030

  ret.r021 = 0.5 * (pxx4 + ret.r120); // = m012
  ret.u201 = 0.5 * (ret.u210 + pxx4); // = m102
  ret.r030 = 0.5 * (ret.u210 + ret.r120); // = u300 = m003

  ret.u102 = 0.5 * (ret.u012 + p4xx); // = m201
  ret.l120 = 0.5 * (ret.l021 + p4xx); // = m210
  ret.l030 = 0.5 * (ret.u012 + ret.l021); // = u003 = m300

  ret.l111 = 0.5 * (p123 + ret.l102);
  ret.r111 = 0.5 * (p312 + ret.r210);
  ret.u111 = 0.5 * (ret.u021 + p231);
  ret.c111 = 0.25 * (p033 + p330 + p303 + p111);

  return ret as BezierTriangleControlpoints;
}
