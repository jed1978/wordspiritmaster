import type {
  GameState,
  GameAction,
  CapturedSpirit,
  DailySession,
} from "@/store/types";
import { processAnswer } from "@/core/srs";
import {
  SRS_INTERVALS,
  XP_PER_CAPTURE,
  XP_PER_REVIEW_CORRECT,
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
  settings: { hapticEnabled: true },
  gacha: { pityCounter: 0 },
  sessionFlags: {
    dailyReviewCompleted: false,
    dailyReviewRewardClaimed: false,
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
      return {
        ...state,
        spirits: { ...state.spirits, [action.wordId]: spirit },
        totalXp: state.totalXp + XP_PER_CAPTURE,
        dailySession: {
          ...state.dailySession,
          capturesDone: state.dailySession.capturesDone + 1,
        },
      };
    }

    case "REVIEW_ANSWER": {
      const existing = state.spirits[action.wordId];
      if (!existing) return state;
      const updated = processAnswer(existing, action.isCorrect);
      const xpGain = action.isCorrect ? XP_PER_REVIEW_CORRECT : 0;
      return {
        ...state,
        spirits: { ...state.spirits, [action.wordId]: updated },
        totalXp: state.totalXp + xpGain,
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
      return state;

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

    default:
      return state;
  }
}
