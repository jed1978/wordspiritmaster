import type { SpiritStage } from '@/store/types';
import {
  XP_PER_REVIEW_CORRECT,
  XP_LEVEL_BASE,
  XP_LEVEL_MULTIPLIER,
} from '@/utils/constants';

export function calculateXp(isCorrect: boolean, stage: SpiritStage): number {
  return isCorrect ? XP_PER_REVIEW_CORRECT * stage : 0;
}

export function getXpForNextLevel(level: number): number {
  return Math.floor(XP_LEVEL_BASE * Math.pow(XP_LEVEL_MULTIPLIER, level - 1));
}

export function getLevel(totalXp: number): number {
  let level = 1;
  let xpNeeded = 0;

  while (true) {
    xpNeeded += getXpForNextLevel(level);
    if (totalXp < xpNeeded) return level;
    level++;
  }
}
