import type {
  GameState,
  GameAction,
  CapturedSpirit,
  DailySession,
} from "@/store/types";
import { processAnswer } from "@/core/srs";
import { getLevel } from "@/core/progression";
import {
  SRS_INTERVALS,
  XP_PER_CAPTURE,
  XP_PER_REVIEW_CORRECT,
  XP_PER_BOSS,
} from "@/utils/constants";

const EMPTY_SESSION: DailySession = {
  date: "",
  reviewsDone: 0,
  capturesDone: 0,
  newWordsEncountered: 0,
};

export const INITIAL_GAME_STATE: GameState = {
  spirits: {},
  currentPack: 1,
  wordsEncountered: [],
  streak: 0,
  lastSessionDate: null,
  dailySession: EMPTY_SESSION,
  totalXp: 0,
  level: 1,
  hasSeenWelcome: false,
  settings: { hapticEnabled: true, soundEnabled: true },
  gacha: { pityCounter: 0, freeRemainingToday: 1 },
  sessionFlags: {
    dailyReviewCompleted: false,
    dailyReviewRewardClaimed: false,
  },
  progress: {
    unlockedAreas: [1],
    defeatedAreas: [],
  },
};

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "LOAD_STATE":
      return { ...action.state };

    case "CAPTURE_SPIRIT": {
      if (state.spirits[action.wordId]) return state;
      const now = Date.now();
      const spirit: CapturedSpirit = {
        wordId: action.wordId,
        stage: 1,
        consecutiveCorrect: 0,
        nextReviewAt: now + SRS_INTERVALS[1],
        capturedAt: now,
        lastReviewedAt: now,
        totalReviews: 0,
        totalCorrect: 0,
        isShiny: false,
      };
      const newTotalXp = state.totalXp + XP_PER_CAPTURE;
      return {
        ...state,
        spirits: { ...state.spirits, [action.wordId]: spirit },
        totalXp: newTotalXp,
        level: getLevel(newTotalXp),
        dailySession: {
          ...state.dailySession,
          capturesDone: state.dailySession.capturesDone + 1,
        },
      };
    }

    case "REVIEW_ANSWER": {
      const existing = state.spirits[action.wordId];
      if (!existing) return state;
      const updated = processAnswer(
        existing,
        action.isCorrect,
        action.preserveStreak,
      );
      const xpGain = action.isCorrect ? XP_PER_REVIEW_CORRECT : 0;
      const newTotalXpReview = state.totalXp + xpGain;
      return {
        ...state,
        spirits: { ...state.spirits, [action.wordId]: updated },
        totalXp: newTotalXpReview,
        level: getLevel(newTotalXpReview),
        dailySession: {
          ...state.dailySession,
          reviewsDone: state.dailySession.reviewsDone + 1,
        },
      };
    }

    case "ENCOUNTER_WORD":
      if (state.wordsEncountered.includes(action.wordId)) return state;
      return {
        ...state,
        wordsEncountered: [...state.wordsEncountered, action.wordId],
        dailySession: {
          ...state.dailySession,
          newWordsEncountered: state.dailySession.newWordsEncountered + 1,
        },
      };

    case "COMPLETE_SESSION":
      return {
        ...state,
        sessionFlags: {
          ...state.sessionFlags,
          dailyReviewCompleted: true,
        },
      };

    case "DISMISS_WELCOME":
      return { ...state, hasSeenWelcome: true };

    case "TOGGLE_HAPTIC":
      return {
        ...state,
        settings: {
          ...state.settings,
          hapticEnabled: !state.settings.hapticEnabled,
        },
      };

    case "RESET_DAILY_SESSION":
      return {
        ...state,
        dailySession: { ...EMPTY_SESSION, date: action.date },
        gacha: { ...state.gacha, freeRemainingToday: 1 },
      };

    case "UPDATE_STREAK": {
      const lastDate = state.lastSessionDate;
      if (!lastDate) {
        return { ...state, streak: 1, lastSessionDate: action.date };
      }
      const last = new Date(lastDate).getTime();
      const curr = new Date(action.date).getTime();
      const diffDays = Math.round((curr - last) / 86_400_000);
      const newStreak = diffDays === 1 ? state.streak + 1 : 1;
      return { ...state, streak: newStreak, lastSessionDate: action.date };
    }

    case "GACHA_PULL": {
      const pityReset = action.rarity >= 3;
      const newPity = pityReset ? 0 : state.gacha.pityCounter + 1;
      const newFree = Math.max(0, state.gacha.freeRemainingToday - 1);
      const isNew = !state.spirits[action.wordId];
      if (!isNew) {
        return {
          ...state,
          gacha: {
            ...state.gacha,
            pityCounter: newPity,
            freeRemainingToday: newFree,
          },
        };
      }
      const nowGacha = Date.now();
      const gachaSpirit: CapturedSpirit = {
        wordId: action.wordId,
        stage: 1,
        consecutiveCorrect: 0,
        nextReviewAt: nowGacha + SRS_INTERVALS[1],
        capturedAt: nowGacha,
        lastReviewedAt: nowGacha,
        totalReviews: 0,
        totalCorrect: 0,
        isShiny: false,
      };
      const newTotalXpGacha = state.totalXp + XP_PER_CAPTURE;
      return {
        ...state,
        spirits: { ...state.spirits, [action.wordId]: gachaSpirit },
        totalXp: newTotalXpGacha,
        level: getLevel(newTotalXpGacha),
        gacha: {
          ...state.gacha,
          pityCounter: newPity,
          freeRemainingToday: newFree,
        },
        dailySession: {
          ...state.dailySession,
          capturesDone: state.dailySession.capturesDone + 1,
        },
      };
    }

    case "CLAIM_REVIEW_REWARD":
      return {
        ...state,
        sessionFlags: {
          ...state.sessionFlags,
          dailyReviewRewardClaimed: true,
        },
      };

    case "BATTLE_ANSWER": {
      const xpGainBattle = action.isCorrect ? XP_PER_REVIEW_CORRECT : 0;
      const newTotalXpBattle = state.totalXp + xpGainBattle;
      return {
        ...state,
        totalXp: newTotalXpBattle,
        level: getLevel(newTotalXpBattle),
      };
    }

    case "DEFEAT_BOSS": {
      const already = state.progress.defeatedAreas.includes(action.areaId);
      const newTotalXpBoss = state.totalXp + XP_PER_BOSS;
      return {
        ...state,
        totalXp: newTotalXpBoss,
        level: getLevel(newTotalXpBoss),
        progress: already
          ? state.progress
          : {
              ...state.progress,
              defeatedAreas: [...state.progress.defeatedAreas, action.areaId],
            },
      };
    }

    case "UNLOCK_AREA": {
      if (state.progress.unlockedAreas.includes(action.areaId)) return state;
      return {
        ...state,
        progress: {
          ...state.progress,
          unlockedAreas: [...state.progress.unlockedAreas, action.areaId],
        },
      };
    }

    case "TOGGLE_SOUND":
      return {
        ...state,
        settings: {
          ...state.settings,
          soundEnabled: !state.settings.soundEnabled,
        },
      };

    default:
      return state;
  }
}
