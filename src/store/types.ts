export type SpiritType =
  | "flame"
  | "aqua"
  | "nature"
  | "metal"
  | "bloom"
  | "star"
  | "moon"
  | "crystal";

export type PosCategory = "noun" | "verb" | "adj" | "func";

// 1-5 = stages, 6 = mastered
export type SpiritStage = 1 | 2 | 3 | 4 | 5 | 6;

export interface WordEntry {
  id: string;
  word: string;
  pos: string; // n, v, adj, adv, prep, conj, pron
  posCategory: PosCategory;
  meaning: string; // Traditional Chinese meaning
  type: SpiritType;
  pack: number; // 1-4 in Phase 1
  confusers: [string, string, string]; // 3 wrong Chinese meanings
  hint?: string; // explanation shown after wrong answer
}

export interface CapturedSpirit {
  wordId: string;
  stage: SpiritStage;
  consecutiveCorrect: number;
  nextReviewAt: number; // Unix timestamp ms
  capturedAt: number;
  lastReviewedAt: number; // Unix timestamp ms
  totalReviews: number;
  totalCorrect: number;
  isShiny: boolean; // Phase 3 shiny variant
}

export interface DailySession {
  date: string; // YYYY-MM-DD
  reviewsDone: number;
  capturesDone: number;
  newWordsEncountered: number;
}

export interface GameSettings {
  hapticEnabled: boolean;
}

export interface SessionFlags {
  dailyReviewCompleted: boolean;
  dailyReviewRewardClaimed: boolean;
}

export interface GachaState {
  pityCounter: number;
}

export interface GameState {
  spirits: Record<string, CapturedSpirit>; // keyed by wordId
  currentPack: number;
  wordsEncountered: string[]; // wordIds seen but not yet captured
  streak: number;
  lastSessionDate: string | null; // YYYY-MM-DD
  dailySession: DailySession;
  totalXp: number;
  level: number;
  hasSeenWelcome: boolean;
  settings: GameSettings;
  gacha: GachaState;
  sessionFlags: SessionFlags;
}

export interface PersistedState {
  version: number;
  gameState: GameState;
}

export type GameAction =
  | { type: "LOAD_STATE"; state: GameState }
  | { type: "CAPTURE_SPIRIT"; wordId: string }
  | { type: "REVIEW_ANSWER"; wordId: string; isCorrect: boolean }
  | { type: "ENCOUNTER_WORD"; wordId: string }
  | { type: "COMPLETE_SESSION" }
  | { type: "DISMISS_WELCOME" }
  | { type: "TOGGLE_HAPTIC" }
  | { type: "RESET_DAILY_SESSION"; date: string }
  | { type: "UPDATE_STREAK"; date: string };

// Question types for Phase 1
export type QuestionType =
  | "selectChinese" // Stage 1: see English, pick Chinese
  | "selectEnglish" // Stage 2: see Chinese, pick English
  | "spellWord" // Stage 3+ (Phase 2)
  | "posQuestion" // Stage 4+ (Phase 3)
  | "buildSentence"; // Stage 5+ (Phase 3)

export interface Question {
  type: QuestionType;
  wordId: string;
  prompt: string; // English word (stage1) or Chinese meaning (stage2)
  options: string[]; // 4 shuffled options
  correctIndex: number;
  spiritType: SpiritType;
  posCategory: PosCategory;
  stage: SpiritStage;
}
