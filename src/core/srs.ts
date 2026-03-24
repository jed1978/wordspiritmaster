import type { CapturedSpirit, SpiritStage } from '@/store/types';
import { SRS_INTERVALS } from '@/utils/constants';

export function processAnswer(
  spirit: CapturedSpirit,
  isCorrect: boolean,
  now: number = Date.now(),
): CapturedSpirit {
  const newStage: SpiritStage = isCorrect
    ? (Math.min(spirit.stage + 1, 6) as SpiritStage)
    : (Math.max(spirit.stage - 1, 1) as SpiritStage);

  return {
    ...spirit,
    stage: newStage,
    consecutiveCorrect: isCorrect ? spirit.consecutiveCorrect + 1 : 0,
    nextReviewAt: now + SRS_INTERVALS[newStage],
    totalReviews: spirit.totalReviews + 1,
    totalCorrect: isCorrect ? spirit.totalCorrect + 1 : spirit.totalCorrect,
  };
}

export function isDue(spirit: CapturedSpirit, now: number = Date.now()): boolean {
  return spirit.nextReviewAt <= now;
}

export function getDueSpirits(
  spirits: Record<string, CapturedSpirit>,
  now: number = Date.now(),
): string[] {
  return Object.values(spirits)
    .filter((s) => isDue(s, now))
    .sort((a, b) => a.nextReviewAt - b.nextReviewAt)
    .map((s) => s.wordId);
}
