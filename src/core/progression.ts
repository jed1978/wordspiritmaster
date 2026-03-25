import type { SpiritStage } from "@/store/types";
import {
  XP_PER_REVIEW_CORRECT,
  XP_LEVEL_BASE,
  XP_LEVEL_MULTIPLIER,
} from "@/utils/constants";
import { STRINGS } from "@/utils/strings";

export function calculateXp(isCorrect: boolean, stage: SpiritStage): number {
  return isCorrect ? XP_PER_REVIEW_CORRECT * stage : 0;
}

export function getXpForNextLevel(level: number): number {
  return Math.floor(XP_LEVEL_BASE * Math.pow(XP_LEVEL_MULTIPLIER, level - 1));
}

const MAX_LEVEL = 50;

export function getLevel(totalXp: number): number {
  let level = 1;
  let xpNeeded = 0;

  while (level < MAX_LEVEL) {
    xpNeeded += getXpForNextLevel(level);
    if (totalXp < xpNeeded) return level;
    level++;
  }
  return MAX_LEVEL;
}

export function getTitle(level: number): string {
  if (level >= 30) return STRINGS.titleMaster;
  if (level >= 20) return STRINGS.titleExpert;
  if (level >= 10) return STRINGS.titleExplorer;
  if (level >= 5) return STRINGS.titleCatcher;
  return STRINGS.titleNovice;
}

export function getStreakBonus(streak: number): number {
  if (streak >= 30) return 5;
  if (streak >= 14) return 3;
  if (streak >= 7) return 2;
  if (streak >= 3) return 1;
  return 0;
}
