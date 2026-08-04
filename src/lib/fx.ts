/**
 * Live GBP → USD conversion helper.
 *
 * Fetches the current rate from a free FX API, caches it for a few hours,
 * and falls back to a sane constant if the fetch fails (so the webhook path
 * never breaks). Used at ingest time (Stripe webhook) to store USD cents.
 */

const FALLBACK_GBP_USD = 1.27;

let cachedRate: number | null = null;
let cachedAt = 0;
const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours

const RATE_PROVIDERS = [
  // https://open.er-api.com/v6/latest/GBP — free, no key, CORS-friendly
  async (): Promise<number> => {
    const res = await fetch('https://open.er-api.com/v6/latest/GBP', {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`FX API error: ${res.status}`);
    const data = await res.json();
    const rate = data?.rates?.USD as number | undefined;
    if (typeof rate !== 'number' || !isFinite(rate) || rate <= 0) {
      throw new Error('FX API returned invalid USD rate');
    }
    return rate;
  },
];

/** Get the current GBP→USD rate (cached). */
export async function getGbpUsdRate(): Promise<number> {
  if (cachedRate && Date.now() - cachedAt < CACHE_TTL_MS) {
    return cachedRate;
  }

  for (const provider of RATE_PROVIDERS) {
    try {
      const rate = await provider();
      cachedRate = rate;
      cachedAt = Date.now();
      return rate;
    } catch (err) {
      console.error('[fx] Rate fetch failed, trying next provider:', err);
    }
  }

  // Fallback — never throw from the ingestion path
  cachedRate = FALLBACK_GBP_USD;
  cachedAt = Date.now();
  return FALLBACK_GBP_USD;
}

/** Convert an amount in GBP minor units (pence) to USD cents. */
export async function gbpMinorToUsdCents(gbpPence: number): Promise<number> {
  const rate = await getGbpUsdRate();
  return Math.round(gbpPence * rate);
}
