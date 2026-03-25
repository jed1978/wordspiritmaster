import { determineRarity, pullGacha } from "../gacha";
import type { GameState } from "@/store/types";
import { ALL_WORDS } from "@/data/words";
import { PITY_THRESHOLD, GACHA_RARITY_RATES } from "@/utils/constants";

const mockState = (
  pityCounter: number,
  capturedIds: string[] = [],
): Pick<GameState, "currentPack" | "gacha" | "spirits"> => ({
  currentPack: 1,
  gacha: { pityCounter, freeRemainingToday: 1 },
  spirits: Object.fromEntries(
    capturedIds.map((id) => [
      id,
      {
        wordId: id,
        stage: 1 as const,
        consecutiveCorrect: 0,
        nextReviewAt: 0,
        capturedAt: 0,
        lastReviewedAt: 0,
        totalReviews: 0,
        totalCorrect: 0,
        isShiny: false,
      },
    ]),
  ),
});

describe("determineRarity", () => {
  it("returns 3-5 when pity threshold reached", () => {
    const rarity = determineRarity(PITY_THRESHOLD);
    expect(rarity).toBeGreaterThanOrEqual(3);
    expect(rarity).toBeLessThanOrEqual(5);
  });

  it("returns 1-5 normally", () => {
    const results = Array.from({ length: 100 }, () => determineRarity(0));
    expect(results.every((r) => r >= 1 && r <= 5)).toBe(true);
  });

  it("rarity distribution has correct number of tiers", () => {
    expect(GACHA_RARITY_RATES).toHaveLength(5);
  });

  it("rarity rates sum to 1", () => {
    const sum = GACHA_RARITY_RATES.reduce((a, b) => a + b, 0);
    expect(Math.abs(sum - 1)).toBeLessThan(0.001);
  });
});

describe("pullGacha", () => {
  it("returns a valid word from the pool", () => {
    const state = mockState(0);
    const result = pullGacha(state, ALL_WORDS);
    expect(ALL_WORDS.find((w) => w.id === result.wordId)).toBeDefined();
  });

  it("returns word from current pack or below", () => {
    const state = mockState(0);
    const result = pullGacha(state, ALL_WORDS);
    const word = ALL_WORDS.find((w) => w.id === result.wordId);
    expect(word).toBeDefined();
    expect(word!.pack).toBeLessThanOrEqual(state.currentPack);
  });

  it("marks isPity=true when pityCounter >= PITY_THRESHOLD", () => {
    const state = mockState(PITY_THRESHOLD);
    const result = pullGacha(state, ALL_WORDS);
    expect(result.isPity).toBe(true);
    expect(result.rarity).toBeGreaterThanOrEqual(3);
  });

  it("marks isPity=false when pityCounter < PITY_THRESHOLD", () => {
    const state = mockState(0);
    const result = pullGacha(state, ALL_WORDS);
    expect(result.isPity).toBe(false);
  });

  it("marks isNew=true for uncaptured words", () => {
    const state = mockState(0);
    const result = pullGacha(state, ALL_WORDS);
    if (!state.spirits[result.wordId]) {
      expect(result.isNew).toBe(true);
    }
  });

  it("marks isNew=false for already captured words", () => {
    // Capture all pack 1 words so duplicates are guaranteed
    const pack1Ids = ALL_WORDS.filter((w) => w.pack === 1).map((w) => w.id);
    const state = mockState(0, pack1Ids);
    const result = pullGacha(state, ALL_WORDS);
    if (pack1Ids.includes(result.wordId)) {
      expect(result.isNew).toBe(false);
    }
  });

  it("returns rarity between 1 and 5", () => {
    const state = mockState(0);
    const result = pullGacha(state, ALL_WORDS);
    expect(result.rarity).toBeGreaterThanOrEqual(1);
    expect(result.rarity).toBeLessThanOrEqual(5);
  });
});
