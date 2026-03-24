import { processAnswer, isDue, getDueSpirits } from '@/core/srs';
import type { CapturedSpirit, SpiritStage } from '@/store/types';
import { SRS_INTERVALS } from '@/utils/constants';

function makeSpirit(overrides: Partial<CapturedSpirit> = {}): CapturedSpirit {
  return {
    wordId: 'happy',
    stage: 1 as SpiritStage,
    consecutiveCorrect: 0,
    nextReviewAt: 0,
    capturedAt: 1000,
    totalReviews: 0,
    totalCorrect: 0,
    ...overrides,
  };
}

const NOW = 1_000_000;

describe('processAnswer', () => {
  it('correct answer: stage +1, consecutiveCorrect +1, nextReviewAt updated', () => {
    const spirit = makeSpirit({ stage: 1, consecutiveCorrect: 0 });
    const result = processAnswer(spirit, true, NOW);

    expect(result.stage).toBe(2);
    expect(result.consecutiveCorrect).toBe(1);
    expect(result.nextReviewAt).toBe(NOW + SRS_INTERVALS[2]);
    expect(result.totalReviews).toBe(1);
    expect(result.totalCorrect).toBe(1);
  });

  it('wrong answer: stage -1 (min 1), consecutiveCorrect resets to 0', () => {
    const spirit = makeSpirit({ stage: 3, consecutiveCorrect: 2 });
    const result = processAnswer(spirit, false, NOW);

    expect(result.stage).toBe(2);
    expect(result.consecutiveCorrect).toBe(0);
    expect(result.nextReviewAt).toBe(NOW + SRS_INTERVALS[2]);
    expect(result.totalReviews).toBe(1);
    expect(result.totalCorrect).toBe(0);
  });

  it('mastered (stage 6) correct → stays stage 6', () => {
    const spirit = makeSpirit({ stage: 6, consecutiveCorrect: 5 });
    const result = processAnswer(spirit, true, NOW);

    expect(result.stage).toBe(6);
    expect(result.consecutiveCorrect).toBe(6);
  });

  it('stage 1 wrong → stays stage 1', () => {
    const spirit = makeSpirit({ stage: 1, consecutiveCorrect: 0 });
    const result = processAnswer(spirit, false, NOW);

    expect(result.stage).toBe(1);
    expect(result.consecutiveCorrect).toBe(0);
  });

  it('returns a new object (immutable)', () => {
    const spirit = makeSpirit();
    const result = processAnswer(spirit, true, NOW);

    expect(result).not.toBe(spirit);
    expect(spirit.stage).toBe(1); // original unchanged
    expect(spirit.consecutiveCorrect).toBe(0);
  });
});

describe('isDue', () => {
  it('returns true when nextReviewAt <= now', () => {
    const spirit = makeSpirit({ nextReviewAt: NOW - 1 });
    expect(isDue(spirit, NOW)).toBe(true);
  });

  it('returns true when nextReviewAt === now', () => {
    const spirit = makeSpirit({ nextReviewAt: NOW });
    expect(isDue(spirit, NOW)).toBe(true);
  });

  it('returns false when nextReviewAt > now', () => {
    const spirit = makeSpirit({ nextReviewAt: NOW + 1 });
    expect(isDue(spirit, NOW)).toBe(false);
  });
});

describe('getDueSpirits', () => {
  it('returns only due spirits sorted by nextReviewAt ascending', () => {
    const spirits: Record<string, CapturedSpirit> = {
      early: makeSpirit({ wordId: 'early', nextReviewAt: NOW - 200 }),
      notDue: makeSpirit({ wordId: 'notDue', nextReviewAt: NOW + 1000 }),
      late: makeSpirit({ wordId: 'late', nextReviewAt: NOW - 100 }),
    };

    const result = getDueSpirits(spirits, NOW);
    expect(result).toEqual(['early', 'late']);
  });

  it('returns empty array when no spirits are due', () => {
    const spirits: Record<string, CapturedSpirit> = {
      a: makeSpirit({ wordId: 'a', nextReviewAt: NOW + 1000 }),
    };
    expect(getDueSpirits(spirits, NOW)).toEqual([]);
  });

  it('returns empty array for empty input', () => {
    expect(getDueSpirits({}, NOW)).toEqual([]);
  });
});
