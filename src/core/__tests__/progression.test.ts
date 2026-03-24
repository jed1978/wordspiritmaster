import {
  calculateXp,
  getLevel,
  getXpForNextLevel,
} from '@/core/progression';
import {
  XP_PER_CAPTURE,
  XP_PER_REVIEW_CORRECT,
  XP_LEVEL_BASE,
  XP_LEVEL_MULTIPLIER,
} from '@/utils/constants';
import type { SpiritStage } from '@/store/types';

describe('calculateXp', () => {
  it('correct answer at stage 1 → 5 * 1 = 5', () => {
    expect(calculateXp(true, 1)).toBe(XP_PER_REVIEW_CORRECT * 1);
  });

  it('correct answer at stage 3 → 5 * 3 = 15', () => {
    expect(calculateXp(true, 3)).toBe(XP_PER_REVIEW_CORRECT * 3);
  });

  it('wrong answer → 0 xp regardless of stage', () => {
    expect(calculateXp(false, 1)).toBe(0);
    expect(calculateXp(false, 5)).toBe(0);
  });
});

describe('XP_PER_CAPTURE', () => {
  it('equals 10', () => {
    expect(XP_PER_CAPTURE).toBe(10);
  });
});

describe('getLevel', () => {
  it('0 xp → level 1', () => {
    expect(getLevel(0)).toBe(1);
  });

  it('99 xp → level 1 (not yet 100)', () => {
    expect(getLevel(99)).toBe(1);
  });

  it('100 xp → level 2', () => {
    expect(getLevel(XP_LEVEL_BASE)).toBe(2);
  });

  it('250 xp → level 3 (100 + 150 = 250)', () => {
    // Level 2 needs 100, level 3 needs 100*1.5=150 → total 250
    expect(getLevel(250)).toBe(3);
  });

  it('levels increase with xp', () => {
    expect(getLevel(1000)).toBeGreaterThan(getLevel(500));
  });
});

describe('getXpForNextLevel', () => {
  it('level 1 → 100 xp needed', () => {
    expect(getXpForNextLevel(1)).toBe(XP_LEVEL_BASE);
  });

  it('level 2 → 150 xp needed', () => {
    expect(getXpForNextLevel(2)).toBe(
      Math.floor(XP_LEVEL_BASE * XP_LEVEL_MULTIPLIER),
    );
  });

  it('xp requirement increases each level', () => {
    expect(getXpForNextLevel(3)).toBeGreaterThan(getXpForNextLevel(2));
  });
});
