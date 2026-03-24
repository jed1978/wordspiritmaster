import type { SpiritStage } from "@/store/types";

// SRS review intervals in milliseconds
export const SRS_INTERVALS: Record<SpiritStage, number> = {
  1: 60_000, // Stage 1 → 2: 1 minute
  2: 600_000, // Stage 2 → 3: 10 minutes
  3: 86_400_000, // Stage 3 → 4: 1 day
  4: 259_200_000, // Stage 4 → 5: 3 days
  5: 604_800_000, // Stage 5 → mastered: 7 days
  6: Infinity, // Mastered: no next review (rarely resurfaces)
};

export const MAX_STAGE: SpiritStage = 5;
export const MASTERED_STAGE: SpiritStage = 6;
export const PERSIST_VERSION = 2;
export const PERSIST_DEBOUNCE_MS = 500;
export const STORAGE_KEY = "wordspiritmaster_state";

export const STAGE_NAMES: Record<SpiritStage, string> = {
  1: "蛋",
  2: "幼體",
  3: "成長",
  4: "成熟",
  5: "究極",
  6: "精通",
};

export const XP_PER_CAPTURE = 10;
export const XP_PER_REVIEW_CORRECT = 5;
export const XP_LEVEL_BASE = 100;
export const XP_LEVEL_MULTIPLIER = 1.5;

export const DAILY_CAPTURE_TARGET = 10;
export const WRONG_ANSWER_DELAY_MS = 2500;
export const CORRECT_ANSWER_DELAY_MS = 1200;
