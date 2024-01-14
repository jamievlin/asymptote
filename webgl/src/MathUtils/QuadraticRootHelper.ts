import { sqrt1pxm1 } from "./Helpers";

export type QuadraticRootSolution = {
  roots: number;
  t1?: number;
  t2?: number;
};

/** Solve for the real roots of the quadratic equation ax^2+bx+c=0 */
export default function solveForQuadraticRoots(
  a: number,
  b: number,
  c: number,
): QuadraticRootSolution {
  const Fuzz2 = 1000 * Number.EPSILON;
  const Fuzz4 = Fuzz2 * Fuzz2;

  const ret: QuadraticRootSolution = { roots: 0 };

  // Remove roots at numerical infinity.
  if (Math.abs(a) <= Fuzz2 * Math.abs(b) + Fuzz4 * Math.abs(c)) {
    if (Math.abs(b) > Fuzz2 * Math.abs(c)) {
      ret.roots = 1;
      ret.t1 = -c / b;
    } else if (c == 0.0) {
      ret.roots = 1;
      ret.t1 = 0.0;
    } else {
      ret.roots = 0;
    }
  } else {
    const factor = (0.5 * b) / a;
    const denom = b * factor;
    if (Math.abs(denom) <= Fuzz2 * Math.abs(c)) {
      const x = -c / a;
      if (x >= 0.0) {
        ret.roots = 2;
        ret.t2 = Math.sqrt(x);
        ret.t1 = -ret.t2;
      } else ret.roots = 0;
    } else {
      const x = (-2.0 * c) / denom;
      if (x > -1.0) {
        ret.roots = 2;
        const r2 = factor * sqrt1pxm1(x);
        const r1 = -r2 - 2.0 * factor;
        if (r1 <= r2) {
          ret.t1 = r1;
          ret.t2 = r2;
        } else {
          ret.t1 = r2;
          ret.t2 = r1;
        }
      } else if (x == -1.0) {
        ret.roots = 1;
        ret.t1 = ret.t2 = -factor;
      } else ret.roots = 0;
    }
  }

  return ret;
}
