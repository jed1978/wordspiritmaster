import type { GameState, WordEntry } from "@/store/types";
import { PITY_THRESHOLD, GACHA_RARITY_RATES } from "@/utils/constants";

export interface GachaPullResult {
  wordId: string;
  rarity: number; // 1-5 stars
  isNew: boolean;
  isPity: boolean;
}

/**
 * Determine rarity (1-5 stars) based on pity counter.
 * When pity threshold is reached, guarantees 3+ stars.
 */
export function determineRarity(pityCounter: number): number {
  if (pityCounter >= PITY_THRESHOLD) {
    // Pity: only roll from 3-5 star pool
    const pityRates = GACHA_RARITY_RATES.slice(2); // rates for 3, 4, 5 star
    const pitySum = pityRates.reduce((a, b) => a + b, 0);
    const roll = Math.random() * pitySum;
    let cumulative = 0;
    for (let i = 0; i < pityRates.length; i++) {
      cumulative += pityRates[i];
      if (roll < cumulative) return i + 3; // 3, 4, or 5
    }
    return 3; // fallback
  }

  // Normal roll
  const roll = Math.random();
  let cumulative = 0;
  for (let i = 0; i < GACHA_RARITY_RATES.length; i++) {
    cumulative += GACHA_RARITY_RATES[i];
    if (roll < cumulative) return i + 1; // 1-5
  }
  return 1; // fallback
}

/**
 * Pull a gacha result. Pure function — selects a random word
 * from the available pool (current pack and below).
 */
export function pullGacha(
  state: Pick<GameState, "currentPack" | "gacha" | "spirits">,
  allWords: readonly WordEntry[],
): GachaPullResult {
  const isPity = state.gacha.pityCounter >= PITY_THRESHOLD;
  const rarity = determineRarity(state.gacha.pityCounter);

  // Filter words by current pack or below, fallback to all words
  let pool = allWords.filter((w) => w.pack <= state.currentPack);
  if (pool.length === 0) {
    pool = [...allWords];
  }
  const selectedWord = pool[Math.floor(Math.random() * pool.length)];

  const isNew = !(selectedWord.id in state.spirits);

  return {
    wordId: selectedWord.id,
    rarity,
    isNew,
    isPity,
  };
}
