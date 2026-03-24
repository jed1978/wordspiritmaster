import type { CapturedSpirit, SpiritStage } from "@/store/types";
import { SRS_INTERVALS } from "@/utils/constants";

// Consecutive correct answers needed to reach each stage
const STAGE_UP_THRESHOLD: Partial<Record<SpiritStage, number>> = {
  2: 1,
  3: 2,
  4: 3,
  5: 4,
  6: 5,
};

export function processAnswer(
  spirit: CapturedSpirit,
  isCorrect: boolean,
  now: number = Date.now(),
): CapturedSpirit {
  const newConsecutive = isCorrect ? spirit.consecutiveCorrect + 1 : 0;

  let newStage = spirit.stage;
  if (isCorrect) {
    const nextStage = Math.min(spirit.stage + 1, 6) as SpiritStage;
    const threshold = STAGE_UP_THRESHOLD[nextStage] ?? 0;
    if (newConsecutive >= threshold) {
      newStage = nextStage;
    }
  } else {
    newStage = Math.max(spirit.stage - 1, 1) as SpiritStage;
  }

  return {
    ...spirit,
    stage: newStage,
    consecutiveCorrect: newConsecutive,
    nextReviewAt: now + SRS_INTERVALS[newStage],
    lastReviewedAt: now,
    totalReviews: spirit.totalReviews + 1,
    totalCorrect: isCorrect ? spirit.totalCorrect + 1 : spirit.totalCorrect,
  };
}

export function isDue(
  spirit: CapturedSpirit,
  now: number = Date.now(),
): boolean {
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
