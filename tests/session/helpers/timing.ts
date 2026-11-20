/**
 * Timing helpers for constant-time / timing-attack tests.
 *
 * Single wall-clock samples are dominated by JIT warm-up, GC pauses and
 * scheduler noise, so comparing one sample (or a mean that includes outliers)
 * against another makes these tests fail at random on CI. These helpers warm
 * the code path up, interleave the cases being compared, and report medians,
 * which are robust to the occasional outlier.
 */

/** Median of a list of numbers (does not mutate the input). */
export function median(values: number[]): number {
  if (values.length === 0) {
    throw new Error('median() needs at least one value');
  }
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

/**
 * Time one call in nanoseconds. Works for sync and async functions; a sync
 * result is not awaited, so no microtask overhead is added to its measurement.
 */
async function timeOnce(fn: () => unknown): Promise<number> {
  const start = process.hrtime.bigint();
  const result = fn();
  if (result && typeof (result as PromiseLike<unknown>).then === 'function') {
    await result;
  }
  return Number(process.hrtime.bigint() - start);
}

/**
 * Measure several cases with interleaved runs and return each case's median
 * duration in nanoseconds, in the same order as `cases`.
 *
 * @param cases Functions to compare (sync or async)
 * @param iterations Measured runs per case
 * @param warmup Unmeasured runs per case before measuring
 */
export async function medianTimingsNs(
  cases: Array<() => unknown>,
  iterations = 200,
  warmup = 50
): Promise<number[]> {
  for (let i = 0; i < warmup; i++) {
    for (const fn of cases) {
      await fn();
    }
  }

  const samples: number[][] = cases.map(() => []);
  for (let i = 0; i < iterations; i++) {
    for (let c = 0; c < cases.length; c++) {
      samples[c].push(await timeOnce(cases[c]));
    }
  }

  return samples.map(median);
}

/** Ratio of the larger to the smaller value (always >= 1). */
export function spreadRatio(a: number, b: number): number {
  return Math.max(a, b) / Math.min(a, b);
}
